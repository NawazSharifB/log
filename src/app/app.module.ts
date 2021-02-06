import { NgMaterialModule } from './app-modules/ng-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AppGeneralCommonModule } from './app-general-common/app-general-common.module';
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';

// import { AddEditComponent } from './app-add-edit/components/add-edit/add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    NgMaterialModule,
    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule,
    AppGeneralCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
