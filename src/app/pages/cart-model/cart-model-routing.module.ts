import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartModelPage } from './cart-model.page';

const routes: Routes = [
  {
    path: '',
    component: CartModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartModelPageRoutingModule {}
