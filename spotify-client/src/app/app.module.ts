import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { environment } from "environments/environment";
import { SharedModule } from "./shared.module";

import { PartialsModule } from "./components/partials/partials.module";
import { HomeComponent } from "./components/home/home.component";
import { ContactComponent } from "./components/contact/contact.component";
import { AboutUsComponent } from "./components/aboutus/aboutus.component";

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		ContactComponent,
		AboutUsComponent
	],
	imports: [
		SharedModule,
		PartialsModule,
		BrowserModule,
		HttpModule,
		AppRoutes
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
