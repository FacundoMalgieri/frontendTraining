import {Routes, RouterModule} from '@angular/router';
import {FavouritesComponent} from './components/favourites/favourites.component';
import {ExploreComponent} from './components/explore/explore.component';
import {AboutUsComponent} from './components/aboutus/aboutus.component';
import {ArtistComponent} from './components/artist/artist.component';
import {AlbumComponent} from './components/album/album.component';
import {HomeComponent} from './components/home/home.component';

export const routes: Routes = [
	{path: 'home', component: HomeComponent},
	{path: 'explorar', component: ExploreComponent},
	{path: 'aboutus', component: AboutUsComponent},
	{path: 'favoritos', component: FavouritesComponent},
	{path: 'artist/:type/:id', component: ArtistComponent},
	{path: 'album/:id', component: AlbumComponent},
	{path: '', redirectTo: '/home', pathMatch: 'full'},
	{path: '**', redirectTo: '/home', pathMatch: 'full'}
];

export const AppRoutes = RouterModule.forRoot(routes);
