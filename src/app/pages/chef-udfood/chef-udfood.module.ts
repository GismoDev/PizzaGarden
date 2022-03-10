import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChefUdfoodPageRoutingModule } from './chef-udfood-routing.module';

import { ChefUdfoodPage } from './chef-udfood.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChefUdfoodPageRoutingModule
  ],
  declarations: [ChefUdfoodPage]
})
export class ChefUdfoodPageModule {}
