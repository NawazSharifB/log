import { ServerErrorComponent } from './app-general-common/components/server-error/server-error.component';
import { NotFoundComponent } from './app-general-common/components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '_', loadChildren: () => import('./app-add-edit/app-add-edit.module').then(m => m.AppAddEditModule)},
  {path: 'full-info', loadChildren: () => import('./app-full-info/app-full-info.model').then(m => m.AppFullInfoModule)},
  {path: 'log', loadChildren: () => import('./app-log/app-log.module').then(m => m.AppLogModule)},
  // {path: 'common', loadChildren: () => import('./app-general-common/app-general-common.module').then(m => m.AppGeneralCommonModule)},
  {path: 'server-error', component: ServerErrorComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '', redirectTo: 'log', pathMatch: 'full'},

  {path: '**', redirectTo: 'common/not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
