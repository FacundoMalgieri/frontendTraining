import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebService} from '../../services/web.service';
import {environment} from '../../../environments/environment';

@Component({
	moduleId: module.id,
	selector: 'album-comp',
	templateUrl: 'album.component.html',
	styleUrls: ['album.component.css']
})
export class AlbumComponent implements OnInit {
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
		this.route.params.subscribe(
			params => {
				this.id = params['id'];
				this.webService.get(environment.baseSearchUrl + 'albums/' + this.id).subscribe(res => {
					this.result = res;
				}, error => this.errorHandler(error));
			}
		);
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
	 * Navigates to the album's artist section.
	 */
	navigateBack() {
		this.router.navigate(['/artist/artists/' + this.result.artists[0].id]);
	}

	/**
	 * Add a track to users favourite list.
	 * @param {string} id
	 */
	addFavourite(id: string) {
		this.webService.put(environment.addFavourite + id).subscribe(res => {
			if (res.status === 200) {
				alert('Track guardado correctamente');
			}
		});
	}

	/**
	 * Checks if the track has a preview url.
	 * @param item
	 * @returns {boolean}
	 */
	hasPreview(item) {
		return item.preview_url !== null;
	}

	/**
	 * If the error's status text is Unauthorized it generates a new token.
	 * (If user isn't logged it will redirect to spotify's login form).
	 *
	 *  @param error the error from the response.
	 */
	private errorHandler(error: any) {
		if (error.statusText === 'Unauthorized') {
			this.webService.generateToken();
		}
	}
}
