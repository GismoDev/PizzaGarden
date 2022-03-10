import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Adtab4PageRoutingModule } from './adtab4-routing.module';

import { Adtab4Page } from './adtab4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Adtab4PageRoutingModule
  ],
  declarations: [Adtab4Page]
})
export class Adtab4PageModule {}
