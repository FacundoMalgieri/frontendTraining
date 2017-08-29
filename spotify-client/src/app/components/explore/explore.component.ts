import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { WebService } from "../../services/web.service";

declare var particlesJS: any;

@Component({
    moduleId: module.id,
    templateUrl: 'explore.component.html',
    styleUrls: ['explore.component.css']
})

export class ExploreComponent implements OnInit {
    
    clientId: string = 'b6eef19106214c13bd0c2811ea88f407';
    clientSecret: string = '0166b8230f6b4ed9af333454da5b0c9d';
    redirectUri: string = 'http://localhost:4200/explore'
    url = 'https://api.spotify.com/v1/search?type=artist&limit=10&client_id=' + this.clientId + '&q=';
    search: FormControl = new FormControl('', Validators.required);
    results: any[] = [];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private webService: WebService) { }

    ngOnInit(): void {
        console.log(this.url)
        this.search.valueChanges
            .subscribe(search => this.webService.get(this.url + search)
                .subscribe(res => this.results = res));
    }

    getResults() {
    }

}