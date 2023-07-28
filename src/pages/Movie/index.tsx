import { useEffect, useState } from 'react';

import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { Image } from 'react-native-expo-image-cache';
import { Text } from 'react-native-paper';
import api from '../../services/api';
import {
  CastData,
  CrewData,
  MovieDataById,
  MovieProviderData,
} from '../../types/movies';
import {
  getMovieDetails,
  getProviders,
  getCredits,
} from '../../types/requests';

import { styles } from './styles';

export default function Movie({ route }) {
  const { movieId } = route.params;

  const [movie, setMovie] = useState<MovieDataById>({} as MovieDataById);
  const [movieProviders, setMovieProviders] = useState<MovieProviderData[]>([]);
  const [cast, setCast] = useState<CastData[]>([]);
  const [director, setDirector] = useState<CrewData[]>([]);
  const genreNames = movie.genres?.map((genre) => genre.name).join(', ');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(getMovieDetails(movieId));
        const providersResponse = await api.get(getProviders(movieId));
        const creditsResponse = await api.get(getCredits(movieId));

        setCast(creditsResponse.data.cast);
        setDirector(
          creditsResponse.data.crew.filter(
            (member: CrewData) => member.job === 'Director'
          )
        );
        setMovie(response.data);
        if (providersResponse.data.results.BR) {
          setMovieProviders(providersResponse.data.results.BR.flatrate);
        } else {
          setMovieProviders([]);
        }
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };

    fetchMovie();
  }, []);

  console.log(movie);

  return (
    <View>
      <View>
        {movie.backdrop_path && (
          <Image
            uri={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            preview={{
              uri: `https://image.tmdb.org/t/p/w200/${movie.backdrop_path}`,
            }}
            style={styles.img}
          />
        )}
        <View>
          <View style={styles.contentWrapper}>
            <View>
              <Text style={styles.title}>{movie.title}</Text>
              <Text>{genreNames}</Text>
            </View>
            <View style={styles.movieContentWrapper}>
              <View style={styles.gradeWrapper}>
                <Text>Lorem</Text>
                <Text>{(movie.vote_average * 10).toFixed(0)} / 100</Text>
              </View>
              <Button mode="contained" style={styles.favoriteButton}>
                Favoritar
              </Button>
            </View>
            <View>
              <Text style={styles.subtitle}>Sinopse</Text>
              <Text>{movie.overview}</Text>
            </View>
            <View style={styles.movieContentWrapper}>
              <View>
                <Text style={styles.subtitle}>Diretor</Text>
                <Text>{director[0]?.name}</Text>
              </View>
              <View>
                <Text style={styles.subtitle}>Orçamento</Text>
                <Text>US$ {movie.budget?.toLocaleString()}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.subtitle}>Disponível em:</Text>
              <View>
                {movieProviders.length !== 0 ? (
                  movieProviders.map((provider, i) => {
                    return (
                      <Image
                        key={i}
                        uri={`https://image.tmdb.org/t/p/original/${provider}`}
                        preview={{
                          uri: `https://image.tmdb.org/t/p/original/${provider}`,
                        }}
                        style={styles.providerLogo}
                      />
                    );
                  })
                ) : (
                  <Text>Não disponível</Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
