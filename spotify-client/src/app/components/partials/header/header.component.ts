import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from "../../../app.routes";
import { environment } from "environments/environment";

@Component({
    moduleId: module.id,
    selector: 'header-comp',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})

export class HeaderComponent {
    constructor(private router: Router) { }
}
