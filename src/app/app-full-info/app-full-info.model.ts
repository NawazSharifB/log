import { RouterModule } from '@angular/router';
import { AppCommonSharedModule } from './../app-common-shared/app-common-shared.module';
import { FullInfoComponent } from './components/full-info/full-info.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        FullInfoComponent
    ],
    imports: [
        AppCommonSharedModule,
        RouterModule.forChild([
            {path: ':id', component: FullInfoComponent}
        ])
    ]
})

export class AppFullInfoModule {}
