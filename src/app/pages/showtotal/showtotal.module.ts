import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowtotalPageRoutingModule } from './showtotal-routing.module';

import { ShowtotalPage } from './showtotal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowtotalPageRoutingModule
  ],
  declarations: [ShowtotalPage]
})
export class ShowtotalPageModule {}
