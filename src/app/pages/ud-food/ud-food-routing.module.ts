import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UdFoodPage } from './ud-food.page';

const routes: Routes = [
  {
    path: '',
    component: UdFoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UdFoodPageRoutingModule {}
