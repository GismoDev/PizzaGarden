import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Storage }from '@ionic/storage';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  id: string;
  idupdate: string;
  pw: string;
  oldpw: string = "";
  pwnew: string = "";
  confirmpwnew: string = "";

  start: any;
  datastorage :any;
  
  disabledButton;

  constructor(public router: Router,private accsPrvds:AccessProviders,
    public nav: NavController,
    private actRoute:ActivatedRoute,private storage: Storage,
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;
    this.loadUpdate();
  }

  loadUpdate(){
    return new Promise(resolue => {
      let body = {
        aksi: 'ShowUpdate_profile',
        id: this.id
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
        this.pw = res[0].pw;
        this.idupdate = res[0].empID;
          resolue(true);
        console.log("promotion: " +res[0].pw,res[0].empID)
        console.log(res);
      });
    });
  }

  async update(a) {
    console.log(this.confirmpwnew);
    
    if(this.pw != this.oldpw){
      this.presentToast('รหัสผ่านเดิมไม่ถูกต้อง');
    }else if(this.pwnew == ""){
      this.presentToast('โปรดใส่รหัสผ่านใหม่');
    }else if(this.pwnew != this.confirmpwnew){
      this.presentToast('รหัสผ่านใหม่ไม่เหมือนกัน');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait.....',
      });
      loader.present();
    

        return new Promise(resolue => {
          let body = {
            aksi: 'change_password',
            id: a,
            pw: this.pwnew,
          }
          this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
            if(res.success == true) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
              this.nav.navigateRoot(['/user-dashboard/tabs/'+a+'/usertab1/'+a]);
            } else {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
              
            }
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

  public back(id) {
    this.nav.navigateRoot(['/user-dashboard/tabs/'+id+'/usertab1/'+id]);
  }

}
