import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChefUdfoodPage } from './chef-udfood.page';

const routes: Routes = [
  {
    path: '',
    component: ChefUdfoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChefUdfoodPageRoutingModule {}
