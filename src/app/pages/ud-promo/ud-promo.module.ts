import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UdPromoPageRoutingModule } from './ud-promo-routing.module';

import { UdPromoPage } from './ud-promo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UdPromoPageRoutingModule
  ],
  declarations: [UdPromoPage]
})
export class UdPromoPageModule {}
