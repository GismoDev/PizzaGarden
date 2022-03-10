import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowPromoPage } from './show-promo.page';

const routes: Routes = [
  {
    path: '',
    component: ShowPromoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowPromoPageRoutingModule {}
