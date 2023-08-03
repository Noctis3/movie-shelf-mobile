import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 200,
  },
  contentWrapper: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  gradeWrapper: {
    flexDirection: 'row',
    gap: 16,
  },
  movieContentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favoriteButton: {
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 4,
  },
  providersWrapper: {
    paddingLeft: 16,
  },
  providerLogo: {
    height: 64,
    width: 64,
    borderRadius: 18,
    marginRight: 8,
  },
});
