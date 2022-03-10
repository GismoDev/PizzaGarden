import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Usertab3PageRoutingModule } from './usertab3-routing.module';

import { Usertab3Page } from './usertab3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Usertab3PageRoutingModule
  ],
  declarations: [Usertab3Page]
})
export class Usertab3PageModule {}
