import { AppCommonSharedModule } from './../app-common-shared/app-common-shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LogComponent } from './components/log/log.component';
import { LogTableComponent } from './components/log-table/log-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        LogComponent,
        LogTableComponent
    ],
    imports: [
        ReactiveFormsModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        AppCommonSharedModule,
        RouterModule.forChild([
            {path: '', component: LogComponent}
        ]),
    ]
})
export class AppLogModule {}
