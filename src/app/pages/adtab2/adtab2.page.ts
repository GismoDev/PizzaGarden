import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, AlertController, ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';

@Component({
  selector: 'app-adtab2',
  templateUrl: './adtab2.page.html',
  styleUrls: ['./adtab2.page.scss'],
})
export class Adtab2Page implements OnInit {

    promoName: string = "";
    detail: string = "";
    sale: string = "";
    Date_start: string = "";
    Date_end: string = "";

    disabledButton;
 
  constructor(public nav: NavController,private router: Router,
    private toastCtrl: ToastController,private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,private accsPrvds: AccessProviders,
    private actRoute:ActivatedRoute,public actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.disabledButton = false;
  }

  async add() {
    if(this.promoName == ""){
      this.presentToast('PromoName is required');
    }else if(this.detail == ""){
      this.presentToast('Detail is required');
    }else if(this.sale == ""){
      this.presentToast('Sale is required');
    } else if(this.Date_start == ""){
      this.presentToast('Date_start is required');
    } else if(this.Date_end == ""){
      this.presentToast('Date_end is required');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait.....',
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'add_promo',
          promoName: this.promoName,
          detail: this.detail,
          sale: this.sale,
          Date_start: this.Date_start.substring(0,10),
          Date_end: this.Date_end.substring(0,10),
        }

        this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any) =>{
            if(res.success == true) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
              this.router.navigate(['/show-promo']);
              this.promoName = null;
              this.detail = null;
              this.sale = null;
              this.Date_start = null;
              this.Date_end = null;
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

  pushshowpromo() {
    this.router.navigateByUrl('/show-promo');
  }
}
