import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { AccessProviders } from './providers/access-providers';
import { CartModelPageModule } from './pages/cart-model/cart-model.module';
import { ReservationPageModule } from './pages/reservation/reservation.module';
import { TablePageModule } from './pages/table/table.module';
import { ShowOrderdetailPageModule } from './pages/show-orderdetail/show-orderdetail.module';
import { ShowtotalPageModule } from './pages/showtotal/showtotal.module';
import { BillPageModule } from './pages/bill/bill.module';
import { ReservComingPageModule } from './pages/reserv-coming/reserv-coming.module';
import { ShowOdtchefPageModule } from './pages/show-odtchef/show-odtchef.module';
import { SelectpromoPageModule } from './pages/selectpromo/selectpromo.module';

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ChangeTablePageModule } from './pages/change-table/change-table.module';
import { ShowBillPage } from './pages/show-bill/show-bill.page';
import { ShowBillPageModule } from './pages/show-bill/show-bill.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  IonicStorageModule.forRoot(),HttpClientModule,CartModelPageModule,ReservationPageModule,
  TablePageModule,ShowOrderdetailPageModule,ShowtotalPageModule,BillPageModule,
  ReservComingPageModule,ShowOdtchefPageModule,SelectpromoPageModule,ChangeTablePageModule,ShowBillPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    AccessProviders,
    File,
    FileOpener,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
