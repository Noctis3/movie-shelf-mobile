import { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

import { IPageProps } from '../../types/navigation';
import { AuthContext } from '../../contexts/auth';

export default function Home({ navigation }: IPageProps) {
  // get auth context
  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => {
          signOut();
        }}
      >
        SignOut
      </Button>
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
