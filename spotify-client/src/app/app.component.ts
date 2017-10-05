import {Component} from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		<header-comp></header-comp>
		<router-outlet></router-outlet>
		<footer-comp></footer-comp>`
})

export class AppComponent {
}
