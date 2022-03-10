import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Adtab2PageRoutingModule } from './adtab2-routing.module';

import { Adtab2Page } from './adtab2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Adtab2PageRoutingModule
  ],
  declarations: [Adtab2Page]
})
export class Adtab2PageModule {}
