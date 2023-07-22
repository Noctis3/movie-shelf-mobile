import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Image } from 'react-native-expo-image-cache';

import { IPageProps } from '../../types/navigation';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/api';
import { GET_MOVIE_LIST } from '../../types/requests';
import MovieCard from '../../components/MovieCard';

export default function Home({ navigation }: IPageProps) {
  // get auth context
  const { user } = useContext(AuthContext);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    api.get(`${GET_MOVIE_LIST}`).then((response) => {
      setMovieList(response.data.results);
    });
  }, []);

  return (
    <ScrollView style={styles.scrollWrapper}>
      <SafeAreaView style={styles.container}>
        {movieList.map((movie, i) => {
          return <MovieCard key={i} movie={movie} />;
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
});
