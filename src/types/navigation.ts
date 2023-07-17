import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomeSection: undefined;
  SignIn: undefined;
};

export interface IPageProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}
