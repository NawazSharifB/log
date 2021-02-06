import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgMaterialModule } from './../app-modules/ng-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const DECLARATIONS = [];
const MODULES = [
    CommonModule,
    NgMaterialModule,
    FlexLayoutModule
];

@NgModule({
    declarations: [DECLARATIONS],

    imports: [MODULES],
    exports: [MODULES, DECLARATIONS]
})

export class AppCommonSharedModule {}
