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
        this.query('track');
        this.query('artist');
        this.query('album');
    }

    /**
     * Navigates to the desired user to update.
     * @param id 
     */
    openSelected(id: string, type: string): void {
        this.router.navigate(['/artist/' + type + '/' + id]);
    }

    /**
     * This method generates the token to be authorized to make queries to the API.
     */
    login(): void {
        this.webService.generateToken();
    }

    /**
     * This is to make a query and display the following values:
     *  
     * @param value new releases, featured playlists and categories
     */
    selectType(value: string): void {
        this.webService.get('https://api.spotify.com/v1/browse/' + value).subscribe(res => {
            this.organizeData(res, value);
        }, error => {
            this.albumResults = [];
            this.artistResults = [];
            this.trackResults = [];
            this.webService.generateToken();
        })
    }

    /**
     * Makes a query to the API to display the request result.
     * 
     * @param type artist, track , album
     */
    private query(type: string): void {
        this.search.valueChanges.subscribe(search => {
            this.webService.get(this.searchUrl + search + '&type=' + type).subscribe((res) => {
                console.log(res);
                this.organizeData(res, type);
            }, error => {
                this.albumResults = [];
                this.artistResults = [];
                this.trackResults = [];
                this.webService.generateToken();
            })
        })
    }

    /**
     * This method is to save the response data in the correct array.
     * 
     * @param res the response of the request
     * @param type the type of result
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
