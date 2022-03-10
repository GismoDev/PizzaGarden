import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowOdtchefPage } from './show-odtchef.page';

const routes: Routes = [
  {
    path: '',
    component: ShowOdtchefPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowOdtchefPageRoutingModule {}
