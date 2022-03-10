import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Adtab1Page } from './adtab1.page';

const routes: Routes = [
  {
    path: '',
    component: Adtab1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Adtab1PageRoutingModule {}
