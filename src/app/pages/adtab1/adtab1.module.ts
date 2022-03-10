import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Adtab1PageRoutingModule } from './adtab1-routing.module';

import { Adtab1Page } from './adtab1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Adtab1PageRoutingModule
  ],
  declarations: [Adtab1Page]
})
export class Adtab1PageModule {}
