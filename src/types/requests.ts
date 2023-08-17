export const CREATE_REQUEST_TOKEN = 'authentication/token/new';
export const VALIDATE_REQUEST_TOKEN =
  'authentication/token/validate_with_login';
export const CREATE_SESSION = 'authentication/session/new';
export const GET_ACCOUNT_DETAILS = 'account';
export const GET_MOVIE_LIST = 'discover/movie?language=pt-BR';
export function SEARCH_MOVIES(query: string) {
  return `search/movie?query=${query}&language=pt-BR`;
}
export function getUserPicture(path: string | null) {
  return `https://image.tmdb.org/t/p/w400${path}`;
}
export function searchMovies(query: string) {
  return `search/movie?query=${query}&language=pt-BR`;
}
export function getMovieDetails(id: string) {
  return `movie/${id}?language=pt-BR`;
}
export function getProviders(id: string) {
  return `movie/${id}/watch/providers?language=pt-BR`;
}
export function getCredits(id: string) {
  return `movie/${id}/credits?language=pt-BR`;
}
export function getMovieAccountStates(id: string) {
  return `movie/${id}/account_states`;
}
export function postFavoriteMovie(accountId: number) {
  return `account/${accountId}/favorite`;
}
export function getFavoriteMovies(accountId: number) {
  return `account/${accountId}/favorite/movies?language=pt-BR`;
}
export const GET_MOVIE_RECOMMENDATIONS = '/recommended-movies';