import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowBillPageRoutingModule } from './show-bill-routing.module';

import { ShowBillPage } from './show-bill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowBillPageRoutingModule
  ],
  declarations: [ShowBillPage]
})
export class ShowBillPageModule {}
