import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { WebService } from '../../services/web.service';
import { Params } from '@angular/router';

declare var particlesJS: any;

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
    searchUrl: string = 'https://api.spotify.com/v1/search?q='
    selectedType: string;
    
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private webService: WebService) { }

    /**
     * Subscribes the search Form Control to all posibles queries.
     */
    ngOnInit(): void {
        this.query('track', this.trackResults);
        this.query('artist', this.artistResults);
        this.query('album',this.albumResults);
    }


    query(type: string, result: any[]) {
        this.search.valueChanges.subscribe(search => {
            this.webService.get(this.searchUrl + search + '&type=' + type).subscribe((res) => {
                this.organizeData(res, type);
            }, error => {
                this.albumResults = [];
                this.artistResults = [];
                this.trackResults = [];
            })
        })
    }

    organizeData(res: any, type: string) {
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
                break;
            case 'featured-playlists':
                this.playlistsResults = res.playlists.items;
                break;
            case 'new-releases':
                this.albumResults = res.albums.items;
                break;
        }
    }

    login() {
        this.webService.generateToken();
    }

    selectType(value: string) {
        this.webService.get('https://api.spotify.com/v1/browse/' + value).subscribe(res => {
            console.log(res)
            this.organizeData(res, value);
        })
    }
    getResults() {

    }
}
