import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Adtab3Page } from './adtab3.page';

const routes: Routes = [
  {
    path: '',
    component: Adtab3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Adtab3PageRoutingModule {}
