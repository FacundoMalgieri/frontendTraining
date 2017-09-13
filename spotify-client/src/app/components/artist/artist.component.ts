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
    id: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private webService: WebService) { }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                let type = params['type'];
                this.id = params['id'];
                let url = this.searchUrl + type + '/' + this.id + '/';
                this.webService.get(url).subscribe(res => {
                    this.result = res;
                });
                this.webService.get(url + 'albums').subscribe(res => {
                    this.albums = res;
                })

            }
        );
    }

    navigateBack() {
        this.router.navigate(['/explorar'])
    }

   getTracks(id: string, type: string): void {
        this.router.navigate(['/album/' + id]);
    }

}
