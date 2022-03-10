import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservComingPageRoutingModule } from './reserv-coming-routing.module';

import { ReservComingPage } from './reserv-coming.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservComingPageRoutingModule
  ],
  declarations: [ReservComingPage]
})
export class ReservComingPageModule {}
