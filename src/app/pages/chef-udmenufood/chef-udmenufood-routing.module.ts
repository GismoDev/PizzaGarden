import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChefUdmenufoodPage } from './chef-udmenufood.page';

const routes: Routes = [
  {
    path: '',
    component: ChefUdmenufoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChefUdmenufoodPageRoutingModule {}
