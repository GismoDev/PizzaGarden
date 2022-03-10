import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Storage }from '@ionic/storage';


@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.page.html',
  styleUrls: ['./profile-setting.page.scss'],
})
export class ProfileSettingPage implements OnInit {

  empName: string = "";
  empAddress: string = "";
  empEmail: string = "";
  empTel: string = "";
  empCode: string = "";
  id: string;
  start: any;
  datastorage :any;
  idupdate: string;
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
        this.empName = res[0].empName;
        this.empAddress = res[0].empAddress;
        this.empEmail = res[0].empEmail;
        this.empTel = res[0].empTel;
        this.empCode = res[0].empCode;
        this.idupdate = res[0].empID;
          resolue(true);
        console.log("promotion: " +res[0].empName,res[0].empAddress,res[0].empEmail,res[0].empTel,res[0].empCode,res[0].empID)
        console.log(res);
      });
    });
}

  async update(a) {
    if(this.empName == ""){
      this.presentToast('empName is required');
    }else if(this.empAddress == ""){
      this.presentToast('empAddress is required');
    }else if(this.empEmail == ""){
      this.presentToast('empEmail is required');
    } else if(this.empTel == ""){
      this.presentToast('empTel is required');
    } else if(this.empCode == ""){
      this.presentToast('empCode is required');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait.....',
      });
      loader.present();
    

        return new Promise(resolue => {
          let body = {
            aksi: 'update_profile',
            id: a,
            empName: this.empName,
            empAddress: this.empAddress,
            empEmail: this.empEmail,
            empTel: this.empTel,
            empCode: this.empCode,
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
