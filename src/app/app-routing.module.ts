import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'user-dashboard',
    loadChildren: () => import('./pages/user-dashboard/user-dashboard.module').then( m => m.UserDashboardPageModule)
  },
  {
    path: 'show-food',
    loadChildren: () => import('./pages/show-food/show-food.module').then( m => m.ShowFoodPageModule)
  },
  {
    path: 'show-promo',
    loadChildren: () => import('./pages/show-promo/show-promo.module').then( m => m.ShowPromoPageModule)
  },
  {
    path: 'ud-food/:id',
    loadChildren: () => import('./pages/ud-food/ud-food.module').then( m => m.UdFoodPageModule)
  },
  {
    path: 'ud-promo/:id',
    loadChildren: () => import('./pages/ud-promo/ud-promo.module').then( m => m.UdPromoPageModule)
  },
  {
    path: 'ud-emp/:id',
    loadChildren: () => import('./pages/ud-emp/ud-emp.module').then( m => m.UdEmpPageModule)
  },
  {
    path: 'cart-model',
    loadChildren: () => import('./pages/cart-model/cart-model.module').then( m => m.CartModelPageModule)
  },
  // {
  //   path: 'user-chef',
  //   loadChildren: () => import('./pages/user-chef/user-chef.module').then( m => m.UserChefPageModule)
  // },
  {
    path: 'reservation/:tableID',
    loadChildren: () => import('./pages/reservation/reservation.module').then( m => m.ReservationPageModule)
  },
  {
    path: 'table',
    loadChildren: () => import('./pages/table/table.module').then( m => m.TablePageModule)
  },
  {
    path: 'show-orderdetail',
    loadChildren: () => import('./pages/show-orderdetail/show-orderdetail.module').then( m => m.ShowOrderdetailPageModule)
  },
  {
    path: 'showtotal',
    loadChildren: () => import('./pages/showtotal/showtotal.module').then( m => m.ShowtotalPageModule)
  },
  {
    path: 'bill',
    loadChildren: () => import('./pages/bill/bill.module').then( m => m.BillPageModule)
  },
  {
    path: 'reserv-coming',
    loadChildren: () => import('./pages/reserv-coming/reserv-coming.module').then( m => m.ReservComingPageModule)
  },
  {
    path: 'profile-setting/:id',
    loadChildren: () => import('./pages/profile-setting/profile-setting.module').then( m => m.ProfileSettingPageModule)
  },
  {
    path: 'show-odtchef',
    loadChildren: () => import('./pages/show-odtchef/show-odtchef.module').then( m => m.ShowOdtchefPageModule)
  },
  {
    path: 'selectpromo',
    loadChildren: () => import('./pages/selectpromo/selectpromo.module').then( m => m.SelectpromoPageModule)
  },
  {
    path: 'chef-dashboard',
    loadChildren: () => import('./pages/chef-dashboard/chef-dashboard.module').then( m => m.ChefDashboardPageModule)
  },
  {
    path: 'chef-udmenufood/:foodID',
    loadChildren: () => import('./pages/chef-udmenufood/chef-udmenufood.module').then( m => m.ChefUdmenufoodPageModule)
  },
  {
    path: 'order/:tableID/:id',
    loadChildren: () => import('./pages/order/order.module').then( m => m.OrderPageModule)
  },
  {
    path: 'change-password/:id',
    loadChildren: () => import('./pages/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'change-table',
    loadChildren: () => import('./pages/change-table/change-table.module').then( m => m.ChangeTablePageModule)
  },
  {
    path: 'addmoremenu/:id/:orderID',
    loadChildren: () => import('./pages/addmoremenu/addmoremenu.module').then( m => m.AddmoremenuPageModule)
  },
  {
    path: 'show-bill',
    loadChildren: () => import('./pages/show-bill/show-bill.module').then( m => m.ShowBillPageModule)
  },
  {
    path: 'test-pdf/:id',
    loadChildren: () => import('./pages/test-pdf/test-pdf.module').then( m => m.TestPdfPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
