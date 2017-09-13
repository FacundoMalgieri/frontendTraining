import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { WebService } from "../../services/web.service";

@Component({
    moduleId: module.id,
    selector: 'album-comp',
    templateUrl: 'album.component.html',
    styleUrls: ['album.component.css']
})
export class AlbumComponent implements OnInit {
    searchUrl: string = 'https://api.spotify.com/v1/'
    result: any;
    id: any;
    
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private webService: WebService) { }
    
    /**
     * Subscribes to the url's params in order to fetch the album
     */
    ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.id = params['id'];
                this.webService.get(this.searchUrl + 'albums/' + this.id).subscribe(res => {
                    this.result = res;
                })
            }
        );
    }

    /**
     * Navigates to the album's artist section.
     */
    navigateBack() {
        this.router.navigate(['/artist/artists/' + this.result.artists[0].id]);
    }
}
