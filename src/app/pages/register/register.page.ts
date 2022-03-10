import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AccessProviders } from '../../providers/access-providers';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = "";
  pw: string = "";
  empName: string = "";
  empAddress: string = "";
  empEmail: string = "";
  empTel: string = "";
  empCode: string = "";

  disabledButton;

  constructor(public nav:NavController,private router: Router,
    private toastCtrl: ToastController,private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,private accsPrvds: AccessProviders) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.disabledButton = false;
  }

  async confirm() {
    if(this.username == ""){
      this.presentToast('Username is required');
    }else if(this.pw == ""){
      this.presentToast('Password is required');
    }else if(this.empName == ""){
      this.presentToast('Yourname is required');
    } else if (this.empAddress == "") {
      this.presentToast('Address is required');
    } else if (this.empEmail == "") {
      this.presentToast('Email is required');
    } else if (this.empTel == "") {
      this.presentToast('Tel is required');
    } else if (this.empCode == "") {
      this.presentToast('ID Card is required');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait.....',
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'proses_register',
          username: this.username,
          pw: this.pw,
          empName: this.empName,
          empAddress: this.empAddress,
          empEmail: this.empEmail,
          empTel: this.empTel,
          empCode: this.empCode,
        }

        this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any) =>{
            if(res.success == true) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
              this.router.navigate(['/login']);
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
              this.confirm();
            }
          }
        ]
      });
  
      await alert.present();
    }

  signOut() {
    this.nav.navigateBack('/login');
  }

}
