import { ServerErrorComponent } from './components/server-error/server-error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { AppCommonSharedModule } from './../app-common-shared/app-common-shared.module';
import { NgModule } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

const DECLARATIONS = [
    NotFoundComponent,
    ServerErrorComponent,
    NavBarComponent
];

@NgModule({
    declarations: [DECLARATIONS],
    imports: [
        AppCommonSharedModule,
        RouterModule
    ],
    exports: [DECLARATIONS]
})

export class AppGeneralCommonModule {}
