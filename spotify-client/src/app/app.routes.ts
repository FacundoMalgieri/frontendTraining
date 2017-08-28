import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { ContactComponent } from "app/components/contact/contact.component";
import { AboutUsComponent } from "app/components/aboutus/aboutus.component";

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    { path: 'aboutus', component: AboutUsComponent },
    { path: 'contact', component: ContactComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
]

export const AppRoutes = RouterModule.forRoot(routes);
