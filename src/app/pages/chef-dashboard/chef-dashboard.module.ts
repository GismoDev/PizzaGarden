import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChefDashboardPageRoutingModule } from './chef-dashboard-routing.module';

import { ChefDashboardPage } from './chef-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChefDashboardPageRoutingModule
  ],
  declarations: [ChefDashboardPage]
})
export class ChefDashboardPageModule {}
