import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestPdfPageRoutingModule } from './test-pdf-routing.module';

import { TestPdfPage } from './test-pdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestPdfPageRoutingModule
  ],
  declarations: [TestPdfPage]
})
export class TestPdfPageModule {}
