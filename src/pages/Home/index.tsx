import { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';


import { IPageProps } from '../../types/navigation';
import api from '../../services/api';

export default function Home({ navigation }: IPageProps) {
  useEffect(() => {
    api
      .post('authentication/token/validate_with_login', {
        username: 'johnny_appleseed',
        password: 'test123',
        request_token: 'loremipsum',
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button onPress={() => navigation.navigate('SignIn')}>Sign in</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});