import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowBillPage } from './show-bill.page';

const routes: Routes = [
  {
    path: '',
    component: ShowBillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowBillPageRoutingModule {}
