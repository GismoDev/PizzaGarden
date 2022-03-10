import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Adtab3PageRoutingModule } from './adtab3-routing.module';

import { Adtab3Page } from './adtab3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Adtab3PageRoutingModule
  ],
  declarations: [Adtab3Page]
})
export class Adtab3PageModule {}
