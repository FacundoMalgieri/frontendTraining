import { NgModule } from '@angular/core';
import { AppRoutes } from "../../app.routes";
import { SharedModule } from "../../shared.module";
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from "../partials/header/header.component";

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ],
})
export class PartialsModule { }