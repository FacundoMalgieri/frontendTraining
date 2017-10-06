import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';

declare var $: any;
declare var particlesJS: any;

@Component({
	moduleId: module.id,
	templateUrl: 'about.component.html',
	styleUrls: ['about.component.css']
})

export class AboutComponent implements OnInit {
	constructor(private router: Router, private activatedRoute: ActivatedRoute) {
	}

	ngOnInit() {
		this.router.events.subscribe((evt) => {
			if ((evt instanceof NavigationEnd)) {
				window.scrollTo(0, 0);
			}
		});
		this.router.events.filter(event => event instanceof NavigationEnd)
			.map(() => this.activatedRoute)
			.subscribe((event) => {
				$.getScript('assets/js/particles.json');
			});
		particlesJS.load('particles-js', 'assets/js/particles.json', function () {
		});
	}
}
