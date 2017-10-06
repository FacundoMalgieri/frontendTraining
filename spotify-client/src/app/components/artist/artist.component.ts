import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebService} from '../../services/web.service';
import {environment} from '../../../environments/environment';

@Component({
  moduleId: module.id,
  selector: 'artist-comp',
  templateUrl: 'artist.component.html',
  styleUrls: ['artist.component.css']
})
export class ArtistComponent implements OnInit {
  result: any;
  albums: any;
  id: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private webService: WebService) {
  }

  /**
   * Subscribes to the url's params in order to fetch the artist's albums
   */
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const type = params['type'];
        this.id = params['id'];
        const url = environment.baseSearchUrl + type + '/' + this.id + '/';
        this.webService.get(url).subscribe(res => {
          this.result = res;
        }, error => this.errorHandler(error));
        this.webService.get(url + 'albums').subscribe(res => {
          this.albums = res;
        }, error => this.errorHandler(error));
      }
    );
  }

  /**
   * Navigates back to the explore section
   */
  navigateBack() {
    this.router.navigate(['/explorar']);
  }

  /**
   * Navigates to the album section to display an play it's tracks.
   *
   * @param id the album's id
   */
  getTracks(id: string): void {
    this.router.navigate(['/album/' + id]);
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
