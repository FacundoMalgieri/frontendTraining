import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { WebService } from "../../services/web.service";
import { Params } from "@angular/router";

declare var particlesJS: any;

@Component({
    moduleId: module.id,
    templateUrl: 'explore.component.html',
    styleUrls: ['explore.component.css']
})

export class ExploreComponent implements OnInit {
    scope = 'user-follow-modify user-follow-read user-library-read user-library-modify user-read-private user-read-birthdate user-read-email user-top-read';
    clientId: string = 'b6eef19106214c13bd0c2811ea88f407';
    clientSecret: string = '0166b8230f6b4ed9af333454da5b0c9d'; //not necessary
    redirectUri: string = 'http://localhost:4200/explorar'
    response_type = 'token'
    token: string
    searchUrl = 'https://api.spotify.com/v1/search?type=artist&limit=10&client_id=' + this.clientId + '&q=';
    url = 'https://accounts.spotify.com/authorize?' +
    'response_type=' + this.response_type +
    '&client_id=' + this.clientId +
    '&scope=' + this.scope +
    '&redirect_uri=' + this.redirectUri;
    search: FormControl = new FormControl('', Validators.required);
    results: any[] = [];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private webService: WebService) { }

    ngOnInit(): void {
        window.location.href = this.url
        let tokenRoute = this.route.fragment.map(fragment => fragment);
        
        tokenRoute.subscribe(fragment => {
            let fragment1 = !!fragment ? fragment.match(/^(.*?)&/) : '';
        console.log(fragment1);
            
            if (!!fragment1) {
                this.token = fragment1[1].replace('access_token=', '');
                localStorage.setItem('token', this.token)
            }
        })
       
    }

    getResults() {
        this.search.valueChanges
            .subscribe(search => this.webService.get(this.searchUrl + search)
                .subscribe(res => this.results = res));
    }
}
