import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { Text } from 'react-native-paper';

export default function MovieCard({ movie }) {
  return (
    <View style={styles.movieWrapper}>
      <Image
        uri={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        // Add blur on preview
        preview={{
          uri: `https://image.tmdb.org/t/p/w200/${movie.poster_path}`,
        }}
        style={styles.img}
      />
      <View style={styles.movieContentWrapper}>
        <Text style={styles.movieTitle}>{movie.title}</Text>
        <Text>{movie.video}</Text>
        <Text numberOfLines={2}>{movie.overview}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  movieWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  movieContentWrapper: {
    margin: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  movieTitle: {
    fontSize: 18,
  },
  img: {
    width: 150,
    height: 200,
    borderRadius: 15,
  },
});
