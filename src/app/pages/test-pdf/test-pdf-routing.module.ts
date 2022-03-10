import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestPdfPage } from './test-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: TestPdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestPdfPageRoutingModule {}
