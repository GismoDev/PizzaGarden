import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserChefPageRoutingModule } from './user-chef-routing.module';

import { UserChefPage } from './user-chef.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserChefPageRoutingModule
  ],
  declarations: [UserChefPage]
})
export class UserChefPageModule {}
