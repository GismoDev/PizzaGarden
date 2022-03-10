import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UdFoodPageRoutingModule } from './ud-food-routing.module';

import { UdFoodPage } from './ud-food.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UdFoodPageRoutingModule
  ],
  declarations: [UdFoodPage]
})
export class UdFoodPageModule {}
