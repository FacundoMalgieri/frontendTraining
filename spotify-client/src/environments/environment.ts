const generic = 'https://api.spotify.com/v1/';
const favourites = generic + 'me/tracks';
export const environment = {
	production: false,
	clientId: 'f7bfbba3f9754097bbf1e771d1347bfc',
	baseUrl: 'http://localhost:4200',
	redirectUri: 'http://localhost:4200/explorar',
	authorizeUrl: 'https://accounts.spotify.com/authorize?',
	baseSearchUrl: generic,
	searchUrl: generic + 'search?q=',
	favouritesUrl: favourites,
	addFavourite: favourites + '?ids=',
};
