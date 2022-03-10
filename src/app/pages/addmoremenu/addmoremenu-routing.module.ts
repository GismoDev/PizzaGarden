import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddmoremenuPage } from './addmoremenu.page';

const routes: Routes = [
  {
    path: '',
    component: AddmoremenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddmoremenuPageRoutingModule {}
