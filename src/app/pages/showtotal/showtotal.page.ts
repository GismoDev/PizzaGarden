import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage';
import { BillPageModule } from '../bill/bill.module';
import { BillPage } from '../bill/bill.page';

@Component({
  selector: 'app-showtotal',
  templateUrl: './showtotal.page.html',
  styleUrls: ['./showtotal.page.scss'],
})
export class ShowtotalPage implements OnInit {

  public viewtotal:any = [];
  orderID: string;
  start: any;
  datastorage :any;
  id: string;
  bill: string = "";
  billdiscount: string = "";
  billReceive: string = "";
  payment: string = "";
  billTotal: string = "";
  billAmount: string = "";
  promoName;
  promosale;
  tableNumber;

  disabledButton;

  constructor(private actRoute:ActivatedRoute,private modelCtrl: ModalController,
    public router: Router,private accsPrvds:AccessProviders,
    public nav: NavController,private storage: Storage,
    private toastCtrl: ToastController,private alertCtrl: AlertController,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    console.log('รับID : '+this.id);
    console.log('orderID : '+this.orderID);
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;
    this.loadODT();
  }

  loadODT(){
    this.viewtotal = [];
    return new Promise(resolue => {
      let body = {
        aksi: 'show_total',
        orderID: this.orderID
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
         for(let datas of res.arr){
            this.viewtotal.push(datas);
         }
         this.promoName = res.promoname.promoName;
         this.promosale = res.promosale.sale;
         this.tableNumber = res.tableNumber.tableNumber;
          resolue(true);
        console.log(res);
      });
    });
}

getTotal() {
  // console.log('show total : '+j.price);
  return this.bill = this.viewtotal.reduce((i, j) => i + j.price * j.odt_amount, 0);
}

getDiscount() {
  // console.log('show total : '+this.billTotal);
  return this.billdiscount = this.viewtotal.reduce((i,j) => i + ((j.price * j.odt_amount) * this.promosale)/100, 0).toFixed( 0 );
}

getPrice() {
  // console.log('show total : '+this.billTotal);
  return this.billTotal = this.viewtotal.reduce((i,j) => i + (j.price * j.odt_amount) - (j.price * j.odt_amount * this.promosale/100), 0).toFixed( 0 );
  // return this.billTotal = this.viewtotal.reduce((i) => i + (this.getTotal) - (this.getDiscount()), 0);
}

getAmountTotal() {
  return this.billAmount = this.viewtotal.reduce((i, j) => i + j.odt_amount * 1, 0);
}

async confirm() {
  // console.log('sssss' +tableNumber);

    this.disabledButton = true;
    const loader = await this.loadingCtrl.create({
      message: 'Please wait.....',
    });
    loader.present();

    return new Promise(resolve => {
      let body = {
        aksi: 'add_bill',
        orderID: this.orderID,
        id: this.id,
        bill: this.bill,
        billdiscount: this.billdiscount,
        billTotal: this.billTotal,
        billAmount: this.billAmount,
        billReceive: this.billReceive,
        payment: this.payment
      }

      this.accsPrvds.postData(body, 'proses_api.php').subscribe(async (res:any) =>{
          if(res.success == true) {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
            this.modelCtrl.dismiss();
            let model = await this.modelCtrl.create({
              component: BillPage,
              cssClass: 'bill-model',
              componentProps: { 
                orderID: this.orderID,
                id: this.id
               }
              
            });
            console.log(this.orderID,this.id);
            
            return await model.present();
            // this.modalCtrl.dismiss();
            // this.router.navigate(['/user-dashboard/tabs/usertab4/' +this.orderID]);
            // this.router.navigate(['/user-dashboard/tabs/usertab2/', {tableID:tableID}]);
          } else {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
            
          }
      },(err)=> {
        loader.dismiss();
            this.disabledButton = false;
            this.presentAlert('Timeout');
      });

    });
  
}

async presentToast(a){
  const toast = await this.toastCtrl.create({
    message: a,
    duration: 1500,
    position: 'bottom'
  });
  toast.present();
}

async presentAlert(a){
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Close',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            // action
          }
        }, {
          text: 'Try Again',
          handler: () => {
            // this.add(tableNumber);
          }
        }
      ]
    });

    await alert.present();
  }


  close() {
    this.modelCtrl.dismiss();
  }
}
