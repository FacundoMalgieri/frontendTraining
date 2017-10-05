import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebService} from '../../services/web.service';
import {environment} from '../../../environments/environment';

@Component({
	moduleId: module.id,
	selector: 'album-comp',
	templateUrl: 'favourites.component.html',
	styleUrls: ['favourites.component.css']
})
export class FavouritesComponent implements OnInit {
	result: any;
	id: any;

	constructor(private router: Router,
	            private route: ActivatedRoute,
	            private webService: WebService) {
	}

	/**
	 * Subscribes to the url's params in order to fetch the album
	 */
	ngOnInit() {
		this.preventMultiplePlay();
		this.getFavourites();
	}

	/**
	 * If a play is clicked while another is already play it will automatically stop.
	 */
	preventMultiplePlay() {
		document.addEventListener('play', function (e) {
			const audios = document.getElementsByTagName('audio');
			for (let i = 0; i < audios.length; i++) {
				if (audios[i] !== e.target) {
					audios[i].pause();
				}
			}
		}, true);
	}

	/**
	 * Gets all the user favourite tracks
	 */
	getFavourites() {
		this.webService.get(environment.favouritesUrl).subscribe(res => {
			this.result = res;
		}, error => {
			if (error.statusText === 'Unauthorized') {
				this.webService.generateToken();
			}
		});
	}

	/**
	 * Add a track to users favourite list.
	 * @param {string} id
	 */
	removeFavourite(id: string) {
		const that = this;
		if (confirm('Estas seguro que deseas remover este track?')) {
			this.webService.delete(environment.addFavourite + id).subscribe(res => {
				if (res.status === 200) {
					alert('Track removido correctamente');
					that.getFavourites();
				}
			});
		}
	}

	/**
	 * Checks if the track has a preview url.
	 * @param item
	 * @returns {boolean}
	 */
	hasPreview(item) {
		return item.track.preview_url !== null;
	}
}

