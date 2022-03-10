import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Adtab6PageRoutingModule } from './adtab6-routing.module';

import { Adtab6Page } from './adtab6.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Adtab6PageRoutingModule
  ],
  declarations: [Adtab6Page]
})
export class Adtab6PageModule {}
