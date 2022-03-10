import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDashboardPage } from './user-dashboard.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/:id/usertab1/:id',  //tabs/usertab1
    pathMatch: 'full'
  },
  {
    path: 'tabs/:id',
    component: UserDashboardPage,
    children: [
      {
        path: 'usertab1', // usertab1
        children: [
          {
            path: ':id',
            // path: '',
            loadChildren: () => import('../usertab1/usertab1.module').then( m => m.Usertab1PageModule)
          },
          {
            path: '',
            loadChildren: () => import('../usertab1/usertab1.module').then( m => m.Usertab1PageModule)
          }
        ]
      },
      {
        path: 'usertab2',
        children: [
          {
            path: ':id',
            loadChildren: () => import('../usertab2/usertab2.module').then( m => m.Usertab2PageModule)
            
          },
          {
            path: '',
            loadChildren: () => import('../usertab2/usertab2.module').then( m => m.Usertab2PageModule)
          }

        ]
      },
      {
        path: 'usertab3',
        children: [
          {
            path: ':id',
            loadChildren: () => import('../usertab3/usertab3.module').then( m => m.Usertab3PageModule)
          },
          {
            path: '',
            loadChildren: () => import('../usertab3/usertab3.module').then( m => m.Usertab3PageModule)
          }
        ]
      },
      {
        path: 'usertab4',
        children: [
          {
            path: ':id',
            loadChildren: () => import('../usertab4/usertab4.module').then( m => m.Usertab4PageModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDashboardPageRoutingModule {}
