import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChefDashboardPage } from './chef-dashboard.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/cheftab1',
   pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: ChefDashboardPage,
    children: [
      {
        path: 'cheftab1',
        children: [
          {
            path: '',
            loadChildren: () => import('../user-chef/user-chef.module').then( m => m.UserChefPageModule)
          }
        ]
      },
      {
        path: 'cheftab2',
        children: [
          {
            path: '',
            loadChildren: () => import('../chef-udfood/chef-udfood.module').then( m => m.ChefUdfoodPageModule)
          }
        ]
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChefDashboardPageRoutingModule {}
