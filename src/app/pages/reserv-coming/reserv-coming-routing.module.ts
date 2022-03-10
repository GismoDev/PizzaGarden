import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservComingPage } from './reserv-coming.page';

const routes: Routes = [
  {
    path: '',
    component: ReservComingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservComingPageRoutingModule {}
