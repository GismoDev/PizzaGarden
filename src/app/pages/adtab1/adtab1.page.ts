import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, AlertController, ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage'

@Component({
  selector: 'app-adtab1',
  templateUrl: './adtab1.page.html',
  styleUrls: ['./adtab1.page.scss'],
})
export class Adtab1Page implements OnInit {

  foodName: string = "";
  price: string = "";
  categoryID: string = "";
  public viewtopten:any = [];

  disabledButton;

  public viewcategory:any = [];
  datastorage:any;
  start:any;

  constructor(public nav:NavController,private router: Router,
    private toastCtrl: ToastController,private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,private accsPrvds: AccessProviders,
    private actRoute:ActivatedRoute,private storage: Storage,public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.disabledButton = false;
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;
    this.showcategory();
    this.showTopten();
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

segmentChanged(value){
  // this.allfood = [];
  // this.viewfood = [];
  // this.viewpromo = [];
  // this.viewtopten = [];
  // this.viewcategory = [];
}

async Alert(a){
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    message: a,
    backdropDismiss: false,
    buttons: [
      {
        text: 'OK',
        cssClass: 'alert-color',
        handler: () => {
          // this.add();
          this.alertCtrl.dismiss();
        }
      }
    ]
  });

  await alert.present();
}

  async add() {
    if(this.foodName == ""){
      this.presentToast('Foodname is required');
    }else if(this.price == ""){
      this.presentToast('Price is required');
    }else if(this.categoryID == ""){
      this.presentToast('categoryID is required');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait.....',
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'add_menu',
          foodName: this.foodName,
          price: this.price,
          categoryID: this.categoryID,
        }

        this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any) =>{
            if(res.success == true) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
              console.log(this.foodName,this.categoryID);
              this.router.navigate(['/show-food']);
              this.foodName = null;
              this.price = null;
              this.categoryID = null;

            } else {
              loader.dismiss();
              this.disabledButton = false;
              this.Alert(res.msg);
              this.foodName = null;
              this.price = null;
              this.categoryID = null;
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
              this.add();
            }
          }
        ]
      });
  
      await alert.present();
    }

    async signOut() {
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
        }]
      });
      await actionSheet.present();
    }

  pushshowfood() {
    this.router.navigateByUrl('/show-food');
    this.foodName = null;
    this.price = null;
    this.categoryID = null;
  }
}
