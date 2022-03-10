import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Adtab5PageRoutingModule } from './adtab5-routing.module';

import { Adtab5Page } from './adtab5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Adtab5PageRoutingModule
  ],
  declarations: [Adtab5Page]
})
export class Adtab5PageModule {}
