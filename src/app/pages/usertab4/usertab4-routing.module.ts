import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Usertab4Page } from './usertab4.page';

const routes: Routes = [
  {
    path: '',
    component: Usertab4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Usertab4PageRoutingModule {}
