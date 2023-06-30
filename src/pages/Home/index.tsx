import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

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
      <Text style={styles.text}>Home</Text>
      <Button title="Sign in" onPress={() => navigation.navigate('SignIn')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 8,
  },
});
