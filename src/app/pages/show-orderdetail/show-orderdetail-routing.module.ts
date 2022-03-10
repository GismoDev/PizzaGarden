import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowOrderdetailPage } from './show-orderdetail.page';

const routes: Routes = [
  {
    path: '',
    component: ShowOrderdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowOrderdetailPageRoutingModule {}
