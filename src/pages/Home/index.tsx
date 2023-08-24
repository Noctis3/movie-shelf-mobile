import { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';

import { AuthContext } from '../../contexts/auth';
import { IPageProps } from '../../types/navigation';

import api from '../../services/api';
import { discoverMovies, SEARCH_MOVIES } from '../../types/requests';

import MovieCard from '../../components/MovieCard';

type FormData = {
  search: string;
};

export default function Home({ navigation }: IPageProps) {
  // get auth context
  const { user } = useContext(AuthContext);
  const [originalMovieList, setOriginalMovieList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const { control, formState, handleSubmit, clearErrors, setError } =
    useForm<FormData>({
      mode: 'onChange',
    });

  useEffect(() => {
    api.get(`${discoverMovies()}`).then((response) => {
      setOriginalMovieList(response.data.results);
      setMovieList(response.data.results);
    });
  }, []);

  const submit = async (data: { search: string }) => {
    try {
      clearErrors();
      await api
        .get(SEARCH_MOVIES(data.search), {
          params: {
            query: data.search,
          },
        })
        .then((response) => {
          setMovieList(response.data.results);
        });
    } catch (error) {
      setError('root', { type: 'manual', message: 'Erro ao autenticar' });
    }
  };

  return (
    <ScrollView style={styles.scrollWrapper}>
      <Controller
        control={control}
        name="search"
        defaultValue=""
        render={({ field, fieldState }) => (
          <>
            <Searchbar
              placeholder="Buscar por filmes"
              value={field.value}
              onChangeText={field.onChange}
              onSubmitEditing={handleSubmit(submit)}
              onClearIconPress={() => setMovieList(originalMovieList)}
              style={styles.searchWrapper}
            />
          </>
        )}
      />
      <SafeAreaView style={styles.container}>
        {movieList.map((movie, i) => {
          return <MovieCard key={i} movie={movie} />;
        })}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    marginBottom: 20,
  },
  scrollWrapper: {
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
});
