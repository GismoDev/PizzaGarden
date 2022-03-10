import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UdEmpPageRoutingModule } from './ud-emp-routing.module';

import { UdEmpPage } from './ud-emp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UdEmpPageRoutingModule
  ],
  declarations: [UdEmpPage]
})
export class UdEmpPageModule {}
