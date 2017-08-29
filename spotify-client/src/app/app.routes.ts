import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { ExploreComponent } from "app/components/explore/explore.component";
import { AboutUsComponent } from "app/components/aboutus/aboutus.component";

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    { path: 'explorar', component: ExploreComponent },
    { path: 'aboutus', component: AboutUsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
]

export const AppRoutes = RouterModule.forRoot(routes);
