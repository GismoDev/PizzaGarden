import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectpromoPageRoutingModule } from './selectpromo-routing.module';

import { SelectpromoPage } from './selectpromo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectpromoPageRoutingModule
  ],
  declarations: [SelectpromoPage]
})
export class SelectpromoPageModule {}
