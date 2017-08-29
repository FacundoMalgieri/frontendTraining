import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { environment } from "environments/environment";
import { SharedModule } from "./shared.module";

import { PartialsModule } from "./components/partials/partials.module";
import { HomeComponent } from "./components/home/home.component";
import { ExploreComponent } from "./components/explore/explore.component";
import { AboutUsComponent } from "./components/aboutus/aboutus.component";
import { WebService } from "./services/web.service";

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		ExploreComponent,
		AboutUsComponent
	],
	imports: [
		SharedModule,
		PartialsModule,
		BrowserModule,
		HttpModule,
		AppRoutes
	],
	providers: [WebService],
	bootstrap: [AppComponent]
})

export class AppModule { }
