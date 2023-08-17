import { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { AuthContext } from '../../contexts/auth';
import { IPageProps } from '../../types/navigation';

import api from '../../services/api';

import MovieCard from '../../components/MovieCard';
import { useFocusEffect } from '@react-navigation/native';

import { styles } from './styles';
import {
  GET_MOVIE_RECOMMENDATIONS,
  getFavoriteMovies,
  searchMovies,
} from '../../types/requests';
import { Image } from 'react-native-expo-image-cache';
import { Button, IconButton, Text } from 'react-native-paper';
import openai from '../../services/openai';
import { set } from 'react-hook-form';

export default function FavoriteMovies({ navigation }: IPageProps) {
  // get auth context
  const { user } = useContext(AuthContext);

  const [movieList, setMovieList] = useState([]);
  const [recommendedMovieList, setRecommendedMovieList] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(() => {
    api
      .get(getFavoriteMovies(user.id), {
        params: {
          session_id: user.sessionId,
        },
      })
      .then((response) => {
        setMovieList(response.data.results);
      });
  });

  async function getRecommendedMovies() {
    setLoading(true);
    // Get favorite movies titles
    const favoriteMoviesTitles = movieList.map((movie) => movie.title);

    const movieListResponse = await openai.post(GET_MOVIE_RECOMMENDATIONS, {
      movies: JSON.stringify(favoriteMoviesTitles),
    });

    const recommendedMoviesNames = movieListResponse.data.map((movie) => {
      return movie.title;
    });

    const moviePromises = recommendedMoviesNames.map(
      async (movieName: string) => {
        const movieResponse = await api.get(searchMovies(movieName));
        const movieData = movieResponse.data.results[0];
        return movieData;
      }
    );

    const movies = await Promise.all(moviePromises);
    setRecommendedMovieList(movies);
    setLoading(false);
  }

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
        <Button
          icon={'auto-fix'}
          mode="contained"
          style={{ marginRight: 16 }}
          onPress={getRecommendedMovies}
          loading={loading}
        >
          Gerar
        </Button>
      </View>
      <View style={styles.recommendedMoviesWrapper}>
        {recommendedMovieList.map((movie, i) => {
          return <MovieCard key={i} movie={movie} />;
        })}
      </View>
    </ScrollView>
  );
}
