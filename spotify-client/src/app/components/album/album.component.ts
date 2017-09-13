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
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private webService: WebService) { }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                let id = params['id'];
                this.webService.get(this.searchUrl + 'albums/' + id).subscribe(res => {
                    this.result = res;
                    console.log(res);
                })

            }
        );
    }
}
