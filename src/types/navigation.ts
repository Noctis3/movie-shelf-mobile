import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
};

export interface IPageProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}
