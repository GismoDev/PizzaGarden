import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Usertab2PageRoutingModule } from './usertab2-routing.module';

import { Usertab2Page } from './usertab2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Usertab2PageRoutingModule
  ],
  declarations: [Usertab2Page]
})
export class Usertab2PageModule {}
