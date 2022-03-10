import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Usertab1PageRoutingModule } from './usertab1-routing.module';

import { Usertab1Page } from './usertab1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Usertab1PageRoutingModule
  ],
  declarations: [Usertab1Page]
})
export class Usertab1PageModule {}
