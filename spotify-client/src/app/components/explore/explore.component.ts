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
    search: FormControl = new FormControl('', Validators.required);
    results: any[] = [];
    searchUrl: string = "https://api.spotify.com/v1/search?type=artist&q="
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private webService: WebService) { }

    ngOnInit(): void {
         this.search.valueChanges
             .subscribe(search => {
             this.webService.get(this.searchUrl+search)
               .subscribe(res => this.results = res)
             })
    }

    login() {
        this.webService.generateToken();
    }
    getResults() {
        
    }
}
