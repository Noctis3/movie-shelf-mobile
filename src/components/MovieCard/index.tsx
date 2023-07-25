import {
  View,
  StyleSheet,
  Image as ImageRN,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { Text } from 'react-native-paper';
import tmdbLogo from '../../images/tmdb.png';
import { genres } from '../../types/movies';
import { IPageProps, RootStackParamList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function MovieCard({ movie }) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Movie', { movieId: movie.id });
      }}
      style={styles.movieWrapper}
    >
      <Image
        uri={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        // Add blur on preview
        preview={{
          uri: `https://image.tmdb.org/t/p/w200/${movie.poster_path}`,
        }}
        style={styles.img}
      />
      <View style={styles.movieContentWrapper}>
        <Text style={styles.movieRelease}>
          {movie.release_date.split('-')[0]}
        </Text>
        <Text style={styles.movieTitle}>{movie.title}</Text>
        <View style={styles.movieRatingWrapper}>
          <ImageRN source={tmdbLogo} style={styles.tmdbLogo} />
          <Text style={styles.movieText}>{movie.vote_average * 10} / 100</Text>
        </View>
        <Text style={styles.movieText}>
          {movie.genre_ids.map((genreId) => {
            const genre = genres.find((genre) => genre.id === genreId);
            return genre ? `${genre.name}, ` : '';
          })}
        </Text>
        <Text style={styles.movieText} numberOfLines={3}>
          {movie.overview}
        </Text>
      </View>
    </TouchableOpacity>
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
    flexDirection: 'column',
    flexShrink: 1,
  },
  movieRatingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tmdbLogo: {
    marginRight: 5,
  },
  movieRelease: {
    color: '#999',
  },
  movieTitle: {
    fontSize: 16,
  },
  movieText: {
    marginVertical: 5,
  },
  img: {
    width: 150,
    height: 220,
    borderRadius: 15,
  },
});
