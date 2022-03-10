import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeTablePageRoutingModule } from './change-table-routing.module';

import { ChangeTablePage } from './change-table.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeTablePageRoutingModule
  ],
  declarations: [ChangeTablePage]
})
export class ChangeTablePageModule {}
