import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowOdtchefPageRoutingModule } from './show-odtchef-routing.module';

import { ShowOdtchefPage } from './show-odtchef.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowOdtchefPageRoutingModule
  ],
  declarations: [ShowOdtchefPage]
})
export class ShowOdtchefPageModule {}
