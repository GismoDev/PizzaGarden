import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddmoremenuPageRoutingModule } from './addmoremenu-routing.module';

import { AddmoremenuPage } from './addmoremenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddmoremenuPageRoutingModule
  ],
  declarations: [AddmoremenuPage]
})
export class AddmoremenuPageModule {}
