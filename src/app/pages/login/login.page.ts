import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  pw: string = "";

  disabledButton;

  

  constructor(
    private router: Router,
    private storage: Storage,public nav:NavController,
    private toastCtrl: ToastController,private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,private accsPrvds: AccessProviders
  ) { }

  ngOnInit() { 
  }

  ionViewDidEnter() {
    this.disabledButton = false;
  }

  async signIn() {
    if(this.username == ""){
      this.presentToast('Username is required');
    }else if(this.pw == ""){
      this.presentToast('Password is required');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait.....',
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'proses_login',
          username: this.username,
          pw: this.pw,
        }

        this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any) =>{
            if(res.success == true) {
              let id = res.userid;
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast('login successfuly');
              this.storage.set('storage_xxx', res.result); // create storage session
              if (res.role == 1){
                console.log('Loaded user: ', id);
                // this.nav.navigateRoot(['/user-dashboard/tabs/usertab1/' , {id:id}]);
                this.nav.navigateRoot(['/user-dashboard/tabs/'+id+'/usertab1/'+id]);
                // this.nav.navigateRoot(['/user-dashboard' , {id:id}]);
              } else if (res.role == 2) {
                console.log('Loaded user: ', id);
                this.nav.navigateRoot(['/chef-dashboard/tabs/cheftab1']);
              } else {
                console.log('Loaded user: ', id);
                this.nav.navigateRoot(['/home']);
              }
            } else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast('Username or Password is Wrong');
              
            }
        },(err)=> {
          loader.dismiss();
              this.disabledButton = false;
              this.presentToast('Timeout');
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

  register() {
    this.router.navigate(['/register'])
  }


}
