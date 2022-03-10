import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowOrderdetailPageRoutingModule } from './show-orderdetail-routing.module';

import { ShowOrderdetailPage } from './show-orderdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowOrderdetailPageRoutingModule
  ],
  declarations: [ShowOrderdetailPage]
})
export class ShowOrderdetailPageModule {}
