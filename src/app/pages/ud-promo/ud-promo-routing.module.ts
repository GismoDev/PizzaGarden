import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UdPromoPage } from './ud-promo.page';

const routes: Routes = [
  {
    path: '',
    component: UdPromoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UdPromoPageRoutingModule {}
