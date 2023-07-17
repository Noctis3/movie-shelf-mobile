import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Image } from 'react-native-expo-image-cache';

import { IPageProps } from '../../types/navigation';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/api';
import { GET_MOVIE_LIST } from '../../types/requests';

export default function Home({ navigation }: IPageProps) {
  // get auth context
  const { user } = useContext(AuthContext);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    api.get(`${GET_MOVIE_LIST}?include_video=true`).then((response) => {
      setMovieList(response.data.results);
      console.log(response.data.results[0]);
    });
  }, []);

  return (
    <ScrollView style={styles.scrollWrapper}>
      <SafeAreaView style={styles.container}>
        {movieList.map((movie, i) => {
          return (
            <View key={i} style={styles.movieWrapper}>
              <Image
                uri={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                // Add blur on preview
                preview={{ uri: `https://image.tmdb.org/t/p/w200/${movie.poster_path}` }}
                style={styles.img}
              />
              <View style={styles.movieContentWrapper}>
                <Text style={styles.movieTitle}>{movie.title}</Text>
                <Text>{movie.video}</Text>
                <Text numberOfLines={2}>{movie.overview}</Text>
                    
              </View>
            </View>
          );
        })}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollWrapper: {
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
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
