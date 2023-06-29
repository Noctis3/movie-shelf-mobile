import { Button, StyleSheet, Text, View } from 'react-native';

import { IPageProps } from '../../types/navigation';

export default function Home({ navigation }: IPageProps) {
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
