const generic = 'https://api.spotify.com/v1/';
const favourites = generic + 'me/tracks';
export const environment = {
	production: false,
	clientId: 'b6eef19106214c13bd0c2811ea88f407',
	baseUrl: 'https://spotify-client.firebaseapp.com',
	redirectUri: 'https://spotify-client.firebaseapp.com/explorar',
	authorizeUrl: 'https://accounts.spotify.com/authorize?',
	baseSearchUrl: generic,
	searchUrl: generic + 'search?q=',
	favouritesUrl: favourites,
	addFavourite: favourites + '?ids=',
};

