import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Adtab4Page } from './adtab4.page';

const routes: Routes = [
  {
    path: '',
    component: Adtab4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Adtab4PageRoutingModule {}
