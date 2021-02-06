import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppCommonSharedModule } from './../app-common-shared/app-common-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterEditComponent } from './components/register-edit/register-edit.component';


const DECLARATIONS = [
    RegisterEditComponent
];

@NgModule({
    declarations: [DECLARATIONS],
    imports: [
        AppCommonSharedModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: 'register', component: RegisterEditComponent},
            {path: 'edit-info/:id', component: RegisterEditComponent},

        ])
    ],
    exports: []
})

export class AppAddEditModule {}
