import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomeSection: undefined;
  SignIn: undefined;
  Movie: { movieId: number };
};

export interface IPageProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}
