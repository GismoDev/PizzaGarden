import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
   path: '',
   redirectTo: 'tabs/adtab1',
   pathMatch: 'full'
 },
 {
   path: 'tabs',
   component: HomePage,
   children: [
     {
       path: 'adtab1',
       children: [
         {
           path: '',
           loadChildren: () => import('../adtab1/adtab1.module').then( m => m.Adtab1PageModule)
         }
       ]
     },
     {
       path: 'adtab2',
       children: [
         {
           path: '',
           loadChildren: () => import('../adtab2/adtab2.module').then( m => m.Adtab2PageModule)
         }
       ]
     },
     {
       path: 'adtab3',
       children: [
         {
           path: '',
           loadChildren: () => import('../adtab3/adtab3.module').then( m => m.Adtab3PageModule)
         }
       ]
     },
     {
      path: 'adtab4',
      children: [
        {
          path: '',
          loadChildren: () => import('../adtab4/adtab4.module').then( m => m.Adtab4PageModule)
        }
      ]
    },
    {
      path: 'adtab5',
      children: [
        {
          path: '',
          loadChildren: () => import('../adtab5/adtab5.module').then( m => m.Adtab5PageModule)
        }
      ]
    },
    {
      path: 'adtab6',
      children: [
        {
          path: '',
          loadChildren: () => import('../adtab6/adtab6.module').then( m => m.Adtab6PageModule)
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
export class HomePageRoutingModule {}
