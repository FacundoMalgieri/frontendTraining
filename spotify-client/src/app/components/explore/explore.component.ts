import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {WebService} from '../../services/web.service';
import {environment} from '../../../environments/environment';

@Component({
	moduleId: module.id,
	templateUrl: 'explore.component.html',
	styleUrls: ['explore.component.css']
})
export class ExploreComponent implements OnInit {
	search: FormControl = new FormControl('', Validators.required);
	categoriesResults: any[] = [];
	playlistsResults: any[] = [];
	artistResults: any[] = [];
	trackResults: any[] = [];
	albumResults: any[] = [];

	constructor(private router: Router,
	            private webService: WebService) {
	}

	/**
	 * Subscribes the search Form Control to all posibles queries.
	 */
	ngOnInit(): void {
		if (localStorage.getItem('token') == null) {
			this.webService.generateToken();
		}
		this.query('track');
		this.query('artist');
		this.query('album');
		this.router.events.subscribe((evt) => {
			if ((evt instanceof NavigationEnd)) {
				window.scrollTo(0, 0);
			}
		});
	}

	/**
	 * Navigates to the desired artist
	 *
	 * @param id the artist's id.
	 * @param type
	 */
	openArtist(id: string, type: string): void {
		this.router.navigate(['/artist/artists/' + id]);
	}

	/**
	 * Navigates to the desired album
	 *
	 * @param id the artist's id.
	 * @param type
	 */
	openAlbum(id: string, type: string): void {
		this.router.navigate(['/album/' + id]);
	}

	/**
	 * Some functionalities aren't implemented to save time due they'r not a functional or optional requisite
	 */
	openAlert() {
		alert('Playlists and Categories not supported yet.');
	}

	/**
	 * Generates the token to be authorized to make queries to the API.
	 */
	login(): void {
		this.webService.generateToken();
	}

	/**
	 * Makes a query and displays the following values:
	 *
	 * @param value new releases, featured playlists and categories.
	 */
	selectType(value: string): void {
		this.webService.get('https://api.spotify.com/v1/browse/' + value).subscribe(res => {
			this.organizeData(res, value);
		}, error => {
			this.errorHandler(error);
		});
	}

	/**
	 * If the error's status text is Unauthorized it generates a new token.
	 * (If user isn't logged it will redirect to spotify's login form).
	 * If its another error it only clears the Results arrays.
	 *
	 *  @param error the error from the response.
	 */
	private errorHandler(error: any) {
		if (error.statusText === 'Unauthorized') {
			this.webService.generateToken();
		} else {
			this.albumResults = [];
			this.artistResults = [];
			this.trackResults = [];
			this.playlistsResults = [];
			this.categoriesResults = [];
		}
	}

	/**
	 * Makes a query to the API to display the request result.
	 *
	 * @param type artist, track , album.
	 */
	private query(type: string): void {
		this.search.valueChanges.subscribe(search => {
			this.webService.get(environment.searchUrl + search + '&type=' + type).subscribe((res) => {
				this.organizeData(res, type);
			}, error => {
				this.errorHandler(error);
			});
		});
	}

	/**
	 * This method is to save the response data in the correct array.
	 *
	 * @param res the response of the request.
	 * @param type the type of result.
	 */
	private organizeData(res: any, type: string): void {
		switch (type) {
			case 'artist':
				this.artistResults = res.artists.items;
				break;
			case 'track':
				this.trackResults = res.tracks.items;
				break;
			case 'album':
				this.albumResults = res.albums.items;
				break;
			case 'categories':
				this.cleanData();
				this.categoriesResults = res.categories.items;
				break;
			case 'featured-playlists':
				this.cleanData();
				this.playlistsResults = res.playlists.items;
				break;
			case 'new-releases':
				this.cleanData();
				this.albumResults = res.albums.items;
				break;
		}
	}

	/**
	 * Cleans the arrays. Its used before showing a new results collection.
	 */
	private cleanData(): void {
		this.playlistsResults = [];
		this.categoriesResults = [];
		this.categoriesResults = [];
		this.albumResults = [];
		this.trackResults = [];
		this.artistResults = [];
	}
}


