import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController, LoadingController, AlertController, ActionSheetController } from '@ionic/angular';
import { CartModelPage } from '../cart-model/cart-model.page';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage';
import { ReservationPage } from '../reservation/reservation.page';
import { TablePage } from '../table/table.page';
import { ReservComingPage } from '../reserv-coming/reserv-coming.page';

@Component({
  selector: 'app-usertab2',
  templateUrl: './usertab2.page.html',
  styleUrls: ['./usertab2.page.scss'],
})
export class Usertab2Page implements OnInit {
  
  public viewtable:any = [];
  public viewreserv:any = [];
  datastorage:any;
  start:any;
  id: string;

  disabledButton;

  constructor(public nav: NavController,public router: Router,
    private actRoute:ActivatedRoute,private storage: Storage,
    private accsPrvds:AccessProviders,private toastCtrl: ToastController,
    public navCtrl: NavController,private loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController,private modelCtrl: ModalController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;
    this.showtable();
    // this.showreserv();
  }
  
  showtable(){
    this.viewtable = [];
    return new Promise(resolue => {
      let body = {
        aksi: 'show_table',
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
         for(let datas of res){
            this.viewtable.push(datas);
         }
          resolue(true);
        console.log(res);
      });
    });
}

async doRefresh(event) {
  this.ionViewDidEnter();

  setTimeout(() => {
    event.target.complete();
  }, 200);

}

  async signOut(a) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Setting',
      cssClass: 'EditIcon',
      buttons: [{
        text: 'Logout',
        icon: 'power',
        handler: () => {
          localStorage.clear();
          this.nav.navigateBack(['/login']);
        }
      },
      {
        text: 'Profile Setting',
        icon: 'person-outline',
        handler: () => {
          localStorage.clear();
          this.nav.navigateBack(['/profile-setting/'+a]);
        }
      },
      {
        text: 'Change Password',
        icon: 'apps-outline',
        handler: () => {
          localStorage.clear();
          this.nav.navigateBack(['/change-password/'+a]);
        }
      }]
    });
    await actionSheet.present();
  }

  async reserv(tableID,id) {
    let model = await this.modelCtrl.create({
      component: ReservationPage,
      cssClass: 'reserv-model',
      componentProps: { tableID: tableID, id: id }
      
    });
    // console.log(tableID,id);
    return await model.present();
    // this.router.navigateByUrl('/resevation/' +tableID);
  }

  async add(tableID,id) {
    let model = await this.modelCtrl.create({
      component: TablePage,
      cssClass: 'table-model',
      componentProps: { tableID: tableID, id: id }
      
    });
    // console.log(tableID,id);
    return await model.present();
  }

  async comingreserv(tableID,id) {
    let model = await this.modelCtrl.create({
      component: ReservComingPage,
      cssClass: 'reserv-coming-model',
      componentProps: { tableID: tableID, id: id }
      
    });
    // console.log(tableID,id);
    return await model.present();
  }

  async home() {
    // console.log('sssss' +tableNumber);
    
    {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait.....',
      });
      loader.present();
  
      return new Promise(resolve => {
        let body = {
          aksi: 'add_order',
          tableID: 1,
          id: this.id,
          orderResev: 'O',
        }
  
        this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any) =>{
            if(res.success == true) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
              // this.modalCtrl.dismiss();
              this.router.navigate(['/order/'+1+'/'+this.id]);
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

}
