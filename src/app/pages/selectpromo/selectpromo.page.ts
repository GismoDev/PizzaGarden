import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { ShowtotalPage } from '../showtotal/showtotal.page';
import { Storage }from '@ionic/storage';

@Component({
  selector: 'app-selectpromo',
  templateUrl: './selectpromo.page.html',
  styleUrls: ['./selectpromo.page.scss'],
})
export class SelectpromoPage implements OnInit {

  public viewpromo:any = [];
  orderID: string;
  start: any;
  datastorage :any;
  id: string;
  disabledButton;

  constructor(private actRoute:ActivatedRoute,private modelCtrl: ModalController,
    public router: Router,private accsPrvds:AccessProviders,
    public nav: NavController,private storage: Storage,
    private toastCtrl: ToastController,private alertCtrl: AlertController,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    console.log('รับID =' +this.id);
    console.log('รับID =' +this.orderID);
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;
    this.showPromo();
  }

  showPromo(){
      this.viewpromo = [];
      return new Promise(resolue => {
        let body = {
          aksi: 'show_promo',
        }
        this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
           for(let datas of res){
              this.viewpromo.push(datas);
           }
            resolue(true);
          console.log(res);
        });
      });
  }
  async addPromo(promoID) {
    // console.log('sssss' +tableNumber);
    {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait.....',
      });
      loader.present();
  
      return new Promise(resolve => {
        let body = {
          aksi: 'update_promoinorder',
          orderID: this.orderID,
          promoID: promoID
        }
  
        this.accsPrvds.postData(body, 'proses_api.php').subscribe(async (res:any) =>{
            if(res.success == true) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
              this.modelCtrl.dismiss();
              let model = await this.modelCtrl.create({
                component: ShowtotalPage,
                cssClass: 'showtotal-model',
                componentProps: { 
                  promoID: promoID,
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
  }

  async skip() {
    // console.log('sssss' +tableNumber);
    {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait.....',
      });
      loader.present();
  
      return new Promise(resolve => {
        let body = {
          aksi: 'update_promoinorder',
          orderID: this.orderID,
          promoID: 1
        }
  
        this.accsPrvds.postData(body, 'proses_api.php').subscribe(async (res:any) =>{
            if(res.success == true) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
              this.modelCtrl.dismiss();
              let model = await this.modelCtrl.create({
                component: ShowtotalPage,
                cssClass: 'showtotal-model',
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
