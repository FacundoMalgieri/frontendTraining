import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from "../../../app.routes";
import { environment } from "environments/environment";
import { WebService } from "../../../services/web.service";

@Component({
    moduleId: module.id,
    selector: 'header-comp',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})

export class HeaderComponent {
    constructor(private router: Router, private webService: WebService) { }

    /**
     * Redirects to Spotify Authorization API
     */
    login() {
        this.webService.generateToken();
    }
}
