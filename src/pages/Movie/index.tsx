import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function Movie({ route }) {
  const { movieId } = route.params;

  return (
    <View>
      <Text>Movie {movieId}</Text>
    </View>
  );
}
