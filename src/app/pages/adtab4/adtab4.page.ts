import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, AlertController, ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage'

@Component({
  selector: 'app-adtab4',
  templateUrl: './adtab4.page.html',
  styleUrls: ['./adtab4.page.scss'],
})
export class Adtab4Page implements OnInit {

  tableNumber: string = "";

  disabledButton;

  public viewtable:any = [];
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
    this.showtable();
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

  async add() {
    if(this.tableNumber == ""){
      this.presentToast('tableNumber is required');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait.....',
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'add_table',
          tableNumber: this.tableNumber,
        }

        this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any) =>{
            if(res.success == true) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
              this.tableNumber = null;
            } else {
              loader.dismiss();
              this.disabledButton = false;
              this.Alert(res.msg);
              this.tableNumber = null;
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

    async delete(a) {
      return new Promise(resolue => {
        let body = {
          aksi: 'del_table',
          id: a
        }
        this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
          if(res.success == true) {
            this.presentToast(' Delete Successfuly ');
            this.ionViewDidEnter();
          } else {
            this.Alert(res.msg);
          }
        });
      });
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

    async doRefresh(event) {
        this.ionViewDidEnter();
        setTimeout(() => {
          event.target.complete();
        }, 200);
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
}
