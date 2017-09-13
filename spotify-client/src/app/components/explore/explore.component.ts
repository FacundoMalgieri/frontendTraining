import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { WebService } from '../../services/web.service';
import { Params } from '@angular/router';

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
    private searchUrl: string = 'https://api.spotify.com/v1/search?q='

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private webService: WebService) { }

    /**
     * Subscribes the search Form Control to all posibles queries.
     */
    ngOnInit(): void {
        if(localStorage.getItem('token') == null) this.webService.generateToken();
        this.query('track');
        this.query('artist');
        this.query('album');
        this.router.events.subscribe((evt) => {
            if ((evt instanceof NavigationEnd))
                window.scrollTo(0, 0);
        });
    }

    /**
     * Navigates to the desired artist
     * 
     * @param id the artist's id.
     */
    openArtist(id: string, type: string): void {
        this.router.navigate(['/artist/artists/' + id]);
    }

    /**
     * Navigates to the desired album
     * 
     * @param id the artist's id.
     */
    openAlbum(id: string, type: string): void {
        this.router.navigate(['/album/' + id]);
    }

    /**
     * Some functionalities aren't implemented to save time due they'r not a functional or optional requisite
     */
    openAlert() {
        alert('La funcionalidad para playlists y categorías aún no esta soportada.')
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
        })
    }

    /**
     * If the error's status text is Unauthorized it generates a new token. 
     * (If user isn't logged it will redirect to spotify's login form).
     * If its another error it only clears the Results arrays.
     *
     *  @param error the error from the response.
     */
    private errorHandler(error: any) {
        if (error.statusText === "Unauthorized") {
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
            this.webService.get(this.searchUrl + search + '&type=' + type).subscribe((res) => {
                this.organizeData(res, type);
            }, error => {
               this.errorHandler(error);                
            })
        })
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
                this.categoriesResults = res.categories.items;
                this.albumResults = [];
                this.playlistsResults = [];
                break;
            case 'featured-playlists':
                this.playlistsResults = res.playlists.items;
                this.categoriesResults = [];
                this.albumResults = [];
                break;
            case 'new-releases':
                this.albumResults = res.albums.items;
                this.playlistsResults = [];
                this.categoriesResults = [];
                break;
        }
    }
}
