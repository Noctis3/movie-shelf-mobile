import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  searchWrapper: {
    marginVertical: 20,
  },
  scrollWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 16,
  },
  img: {
    width: 150,
    height: 220,
    borderRadius: 15,
    marginRight: 8,
  },
  moviesWrapper: {
    paddingLeft: 16,
  },
  recommendedTitleWrapper: {
    marginTop: 28,
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recommendedText: {
    fontSize: 20,
  },
  recommendedMoviesWrapper: {
    padding: 20,
  },
});
