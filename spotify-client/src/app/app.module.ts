import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {SharedModule} from './shared.module';
import {HttpModule} from '@angular/http';
import {AppRoutes} from './app.routes';
import {NgModule} from '@angular/core';

import {ExploreComponent} from './components/explore/explore.component';
import {AboutUsComponent} from './components/aboutus/aboutus.component';
import {ArtistComponent} from './components/artist/artist.component';
import {AlbumComponent} from './components/album/album.component';
import {PartialsModule} from './components/partials/partials.module';
import {HomeComponent} from './components/home/home.component';
import {WebService} from './services/web.service';
import {FavouritesComponent} from './components/favourites/favourites.component';

@NgModule({
	declarations: [
		AppComponent,
		AlbumComponent,
		FavouritesComponent,
		HomeComponent,
		ExploreComponent,
		AboutUsComponent,
		ArtistComponent
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

export class AppModule {
}
