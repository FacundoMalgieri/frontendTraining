import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { WebService } from "../../services/web.service";

@Component({
    moduleId: module.id,
    selector: 'artist-comp',
    templateUrl: 'artist.component.html',
    styleUrls: ['artist.component.css']
})
export class ArtistComponent implements OnInit {
    searchUrl: string = 'https://api.spotify.com/v1/'
    result: any;
    albums: any;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private webService: WebService) { }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                let type = params['type'];
                let id = params['id'];
                let url = this.searchUrl + type + '/' + id + '/';
                this.webService.get(url).subscribe(res => {
                    this.result = res;
                    console.log(this.result);
                });
                this.webService.get(url + 'albums').subscribe(res => {
                    this.albums = res;
                    console.log(this.albums);
                })

            }
        );
    }

    getTracks(id: string) {
        this.webService.get(this.searchUrl + 'albums/' + id + '/tracks').subscribe(res => {
            console.log(res);
        })

    }

}
