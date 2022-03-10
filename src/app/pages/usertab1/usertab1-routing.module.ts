import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Usertab1Page } from './usertab1.page';

const routes: Routes = [
  {
    path: '',
    component: Usertab1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Usertab1PageRoutingModule {}
