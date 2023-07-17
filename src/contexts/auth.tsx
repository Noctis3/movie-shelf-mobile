import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {
  createContext,
  ReactNode,
  useCallback,
  useState,
  useEffect,
} from 'react';
import {
  CREATE_REQUEST_TOKEN,
  CREATE_SESSION,
  GET_ACCOUNT_DETAILS,
  VALIDATE_REQUEST_TOKEN,
} from '../types/requests';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type User = {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string | null;
    };
  };
  id: number;
  include_adult: boolean;
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  username: string;
  sessionId: string;
};

type SignInCredentials = {
  username: string;
  password: string;
};

type AuthContextData = {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  isSignedIn: () => Promise<boolean>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const signIn = useCallback(
    async ({ username, password }: SignInCredentials) => {
      try {
        const response = await api.get(CREATE_REQUEST_TOKEN);
        console.log('Request token created');
        console.log(response.data);

        console.log('Validating request token');

        const validateResponse = await api.post(VALIDATE_REQUEST_TOKEN, {
          request_token: response.data.request_token,
          username: username,
          password: password,
        });
        console.log('Request token validated');
        console.log('validateResponse ' + validateResponse);

        const sessionResponse = await api.post(CREATE_SESSION, {
          request_token: validateResponse.data.request_token,
        });
        console.log('Session created');
        console.log(sessionResponse.data);

        const accountResponse = await api.get(
          `${GET_ACCOUNT_DETAILS}?session_id=${sessionResponse.data.session_id}`
        );
        console.log('Account details');
        console.log(accountResponse.data);

        AsyncStorage.setItem(
          'auth.user',
          JSON.stringify({
            ...accountResponse.data,
            sessionId: sessionResponse.data.session_id,
          })
        );

        setUser({
          ...accountResponse.data,
          sessionId: sessionResponse.data.session_id,
        });

        console.log('User saved on AsyncStorage');
        console.log(user);
        console.log(await AsyncStorage.getItem('auth.user'));
      } catch (error) {
        return Promise.reject(new Error(error));
      }
    },
    []
  );

  function signOut() {
    AsyncStorage.multiRemove(['auth.sessionId', 'auth.user']);
    navigation.navigate('SignIn');
  }

  const isSignedIn = async () => {
    const token = await AsyncStorage.getItem('auth.user');
    return !!token;
  };

  useEffect(() => {
    const getUserData = async () => {
      const user = await AsyncStorage.getItem('auth.user');
      const currentUser = user ? JSON.parse(user) : {};

      if (currentUser?.id) {
        setUser(currentUser);
        navigation.navigate('HomeSection');
      } else {
        navigation.navigate('SignIn');
      }
    };

    getUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isSignedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
