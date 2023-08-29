import { useContext, useEffect, useState } from 'react';
import { View, Image as ImageRN, ScrollView } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/api';

import { Button, IconButton } from 'react-native-paper';
import { Image } from 'react-native-expo-image-cache';
import { Text } from 'react-native-paper';

import {
  CastData,
  CrewData,
  MovieAccountStatesData,
  MovieDataById,
  MovieProviderData,
} from '../../types/movies';
import {
  getMovieDetails,
  getProviders,
  getCredits,
  getMovieAccountStates,
  postFavoriteMovie,
} from '../../types/requests';
import tmdbLogo from '../../images/tmdb.png';
import { styles } from './styles';

import { useTranslation } from 'react-i18next';

export default function Movie({ route }) {
  const { movieId } = route.params;
  const { user } = useContext(AuthContext);

  const [movie, setMovie] = useState<MovieDataById>({} as MovieDataById);
  const [movieProviders, setMovieProviders] = useState<MovieProviderData[]>([]);
  const [cast, setCast] = useState<CastData[]>([]);
  const [director, setDirector] = useState<CrewData[]>([]);
  const [movieAccountStates, setMovieAccountStates] =
    useState<MovieAccountStatesData>();
  const genreNames = movie.genres?.map((genre) => genre.name).join(', ');

  const { t } = useTranslation();

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

        const responseMovieAccountStates = await api.get(
          getMovieAccountStates(movieId),
          {
            params: {
              session_id: user.sessionId,
            },
          }
        );

        setMovieAccountStates(responseMovieAccountStates.data);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };

    fetchMovie();
  }, []);

  async function handleFavorite() {
    try {
      const response = await api.post(
        postFavoriteMovie(user.id),
        {
          media_type: 'movie',
          media_id: movieId,
          favorite: !movieAccountStates?.favorite,
        },
        {
          params: {
            session_id: user.sessionId,
          },
        }
      );

      console.log(response.data);
      if (response.data) {
        setMovieAccountStates({
          ...movieAccountStates,
          favorite: !movieAccountStates?.favorite,
        });
      }
    } catch (error) {
      console.error('Erro ao favoritar filme:', error);
    }
  }

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
                <ImageRN source={tmdbLogo} />
                <Text>{(movie.vote_average * 10).toFixed(0)} / 100</Text>
              </View>
              <IconButton
                icon={movieAccountStates?.favorite ? 'heart' : 'heart-outline'}
                mode="contained"
                size={32}
                style={styles.favoriteButton}
                onPress={handleFavorite}
              />
            </View>
            <View>
              <Text style={styles.subtitle}>{t('synopsis')}</Text>
              <Text>{movie.overview}</Text>
            </View>
            <View style={styles.movieContentWrapper}>
              <View>
                <Text style={styles.subtitle}>{t('director')}</Text>
                <Text>{director[0]?.name}</Text>
              </View>
              <View>
                <Text style={styles.subtitle}>{t('budget')}</Text>
                <Text>US$ {movie.budget?.toLocaleString()}</Text>
              </View>
            </View>
            <Text style={styles.subtitle}>{t('availableIn')}</Text>
          </View>
          <ScrollView horizontal style={styles.providersWrapper}>
            {movieProviders.length !== 0 ? (
              movieProviders.map((provider, i) => {
                return (
                  <Image
                    key={i}
                    uri={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                    preview={{
                      uri: `https://image.tmdb.org/t/p/original/${provider.logo_path}`,
                    }}
                    style={styles.providerLogo}
                  />
                );
              })
            ) : (
              <Text>{t('notAvailable')}</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
