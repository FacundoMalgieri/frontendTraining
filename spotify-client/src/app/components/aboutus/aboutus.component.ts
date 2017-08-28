import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare var particlesJS: any;

@Component({
    moduleId: module.id,
    templateUrl: 'aboutus.component.html',
    styleUrls: ['aboutus.component.css']
})

export class AboutUsComponent {
    constructor(private router: Router) {}

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if ((evt instanceof NavigationEnd))
                window.scrollTo(0, 0);
        });
        
        particlesJS.load('particles-js', 'assets/js/particles.json', function() {});
    }
}