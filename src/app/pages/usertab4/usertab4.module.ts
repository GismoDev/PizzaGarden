import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Usertab4PageRoutingModule } from './usertab4-routing.module';

import { Usertab4Page } from './usertab4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Usertab4PageRoutingModule
  ],
  declarations: [Usertab4Page]
})
export class Usertab4PageModule {}
