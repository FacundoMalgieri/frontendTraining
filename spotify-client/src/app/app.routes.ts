import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { ExploreComponent } from "./components/explore/explore.component";
import { AboutUsComponent } from "./components/aboutus/aboutus.component";
import { ArtistComponent } from "./components/artist/artist.component";

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    { path: 'explorar', component: ExploreComponent },
    { path: 'aboutus', component: AboutUsComponent },
    { path: 'artist/:type/:id', component: ArtistComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
]

export const AppRoutes = RouterModule.forRoot(routes);
