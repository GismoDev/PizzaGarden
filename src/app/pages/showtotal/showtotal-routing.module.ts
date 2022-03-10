import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowtotalPage } from './showtotal.page';

const routes: Routes = [
  {
    path: '',
    component: ShowtotalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowtotalPageRoutingModule {}
