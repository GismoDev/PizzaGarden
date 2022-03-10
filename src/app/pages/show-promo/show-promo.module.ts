import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowPromoPageRoutingModule } from './show-promo-routing.module';

import { ShowPromoPage } from './show-promo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowPromoPageRoutingModule
  ],
  declarations: [ShowPromoPage]
})
export class ShowPromoPageModule {}
