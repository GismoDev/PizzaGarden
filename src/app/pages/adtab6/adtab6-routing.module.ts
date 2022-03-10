import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Adtab6Page } from './adtab6.page';

const routes: Routes = [
  {
    path: '',
    component: Adtab6Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Adtab6PageRoutingModule {}
