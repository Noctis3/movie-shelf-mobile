import { i18n } from '../translate/i18n';

const languageMap: { [key: string]: string } = {
  pt: 'pt-BR',
  es: 'es',
  en: 'en-US',
};

export const CREATE_REQUEST_TOKEN = 'authentication/token/new';
export const VALIDATE_REQUEST_TOKEN =
  'authentication/token/validate_with_login';
export const CREATE_SESSION = 'authentication/session/new';
export const GET_ACCOUNT_DETAILS = 'account';

function getSelectedLanguage() {
  const language = i18n.language;
  return languageMap[language] || language;
}

export function discoverMovies() {
  return `discover/movie?language=${getSelectedLanguage()}`;
}

export function getUserPicture(path: string | null) {
  return `https://image.tmdb.org/t/p/w400${path}`;
}

export function searchMovies(query: string) {
  return `search/movie?query=${query}&language=${getSelectedLanguage()}`;
}

export function getMovieDetails(id: string) {
  return `movie/${id}?language=${getSelectedLanguage()}`;
}

export function getProviders(id: string) {
  return `movie/${id}/watch/providers?language=${getSelectedLanguage()}`;
}

export function getCredits(id: string) {
  return `movie/${id}/credits?language=${getSelectedLanguage()}`;
}

export function getMovieAccountStates(id: string) {
  return `movie/${id}/account_states`;
}

export function postFavoriteMovie(accountId: number) {
  return `account/${accountId}/favorite`;
}

export function getFavoriteMovies(accountId: number) {
  return `account/${accountId}/favorite/movies?language=${getSelectedLanguage()}`;
}

export const GET_MOVIE_RECOMMENDATIONS = '/recommended-movies';
