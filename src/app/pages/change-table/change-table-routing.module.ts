import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeTablePage } from './change-table.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeTablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeTablePageRoutingModule {}
