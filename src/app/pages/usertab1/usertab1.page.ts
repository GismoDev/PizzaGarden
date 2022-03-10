import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage';
import { ReservationPage } from '../reservation/reservation.page';
import { TablePage } from '../table/table.page';
import { ReservComingPageModule } from '../reserv-coming/reserv-coming.module';
import { ReservComingPage } from '../reserv-coming/reserv-coming.page';

@Component({
  selector: 'app-usertab1',
  templateUrl: './usertab1.page.html',
  styleUrls: ['./usertab1.page.scss'],
})
export class Usertab1Page implements OnInit {

  public allfood:any = [];
  public viewfood:any = [];
  public viewpromo:any = [];
  public viewtopten:any = [];
  datastorage:any;
  start:any;
  tableNumber: string;
  tableID: string;
  id: string;
  orderID: string;
  categoryID: string = "";
  public viewcategory:any = [];

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
    this.showFood();
    this.showcategory();
    this.showPromo();
    this.showTopten();
  }

  showTopten(){
    this.viewtopten = [];
    return new Promise(resolue => {
      let body = {
        aksi: 'show_Toptenfood',
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
         for(let datas of res){
            this.viewtopten.push(datas);
         }
          resolue(true);
        console.log(res);
      });
    });
}

   showFood(){
      this.viewfood = [];
      return new Promise(resolue => {
        let body = {
          aksi: 'show_food',
        }
        this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
           for(let datas of res){
              this.viewfood.push(datas);
           }
            resolue(true);
          console.log(res);
        });
      });
  }

  showcategory(){
    this.viewcategory = [];
    return new Promise(resolue => {
      let body = {
        aksi: 'show_category',
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
         for(let datas of res){
            this.viewcategory.push(datas);
         }
          resolue(true);
        console.log(res);
      });
    });
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

async doRefresh(event) {
  this.ionViewDidEnter();

  setTimeout(() => {
    event.target.complete();
  }, 200);

}

async onChange(categoryID) {
  console.log("มาไหม = " +categoryID);
  this.viewfood = [];
  return new Promise(resolue => {
    let body = {
      aksi: 'show_typefood',
      categoryID: this.categoryID
    }
    this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
       for(let datas of res){
          this.viewfood.push(datas);
       }
        resolue(true);
      console.log(res);
    });
  });

}

segmentChanged(value){
  // this.allfood = [];
  // this.viewfood = [];
  // this.viewpromo = [];
  // this.viewtopten = [];
  // this.viewcategory = [];
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
      }
      ]
    });
    await actionSheet.present();
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
