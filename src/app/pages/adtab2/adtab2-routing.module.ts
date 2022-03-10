import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Adtab2Page } from './adtab2.page';

const routes: Routes = [
  {
    path: '',
    component: Adtab2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Adtab2PageRoutingModule {}
