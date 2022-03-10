import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UdEmpPage } from './ud-emp.page';

const routes: Routes = [
  {
    path: '',
    component: UdEmpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UdEmpPageRoutingModule {}
