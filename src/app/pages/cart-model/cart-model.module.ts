import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartModelPageRoutingModule } from './cart-model-routing.module';

import { CartModelPage } from './cart-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartModelPageRoutingModule
  ],
  declarations: [CartModelPage]
})
export class CartModelPageModule {}
