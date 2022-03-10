import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChefUdmenufoodPageRoutingModule } from './chef-udmenufood-routing.module';

import { ChefUdmenufoodPage } from './chef-udmenufood.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChefUdmenufoodPageRoutingModule
  ],
  declarations: [ChefUdmenufoodPage]
})
export class ChefUdmenufoodPageModule {}
