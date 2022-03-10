import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Adtab5Page } from './adtab5.page';

const routes: Routes = [
  {
    path: '',
    component: Adtab5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Adtab5PageRoutingModule {}
