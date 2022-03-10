import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Usertab3Page } from './usertab3.page';

const routes: Routes = [
  {
    path: '',
    component: Usertab3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Usertab3PageRoutingModule {}
