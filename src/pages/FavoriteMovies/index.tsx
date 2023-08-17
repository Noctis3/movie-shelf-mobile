import { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';

import { AuthContext } from '../../contexts/auth';
import { IPageProps } from '../../types/navigation';

import api from '../../services/api';

import MovieCard from '../../components/MovieCard';
import { useFocusEffect } from '@react-navigation/native';

import { styles } from './styles';
import { getFavoriteMovies } from '../../types/requests';
import { Image } from 'react-native-expo-image-cache';
import { Button, IconButton, Text } from 'react-native-paper';

export default function FavoriteMovies({ navigation }: IPageProps) {
  // get auth context
  const { user } = useContext(AuthContext);

  const [movieList, setMovieList] = useState([]);

  useFocusEffect(() => {
    api.get(getFavoriteMovies(user.id)).then((response) => {
      setMovieList(response.data.results);
    });
  });

  return (
    <ScrollView style={styles.scrollWrapper}>
      <Text style={styles.text}>Filmes favoritos</Text>
      <ScrollView horizontal style={styles.moviesWrapper}>
        {movieList.map((movie, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                navigation.navigate('Movie', { movieId: movie.id });
              }}
            >
              <Image
                key={i}
                uri={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                // Add blur on preview
                preview={{
                  uri: `https://image.tmdb.org/t/p/w200/${movie.poster_path}`,
                }}
                style={styles.img}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.recommendedTitleWrapper}>
        <Text style={styles.recommendedText}>Recomendações</Text>
        <IconButton
          icon={'auto-fix'}
          mode="contained"
          size={24}
          style={{ marginRight: 16 }}
        />
      </View>
      <View style={styles.recommendedMoviesWrapper}>
        {movieList.map((movie, i) => {
          return <MovieCard key={i} movie={movie} />;
        })}
      </View>
    </ScrollView>
  );
}
