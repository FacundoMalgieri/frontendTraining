import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        CommonModule,
        RouterModule,
    ],
})

export class SharedModule { }