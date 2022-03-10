import { Component, OnInit } from '@angular/core';
import { Storage }from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { NavController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-ud-emp',
  templateUrl: './ud-emp.page.html',
  styleUrls: ['./ud-emp.page.scss'],
})
export class UdEmpPage implements OnInit {

  role: string;
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
        aksi: 'ShowUpdate_emp',
        id: this.id
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
        this.role = res[0].role;
        this.idupdate = res[0].empID;
          resolue(true);
        console.log("promotion: " +res[0].role,res[0].empID)
        console.log(res);
      });
    });
}

  async update(a) {
    if(this.role == ""){
      this.presentToast('role is required');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait.....',
      });
      loader.present();
    

        return new Promise(resolue => {
          let body = {
            aksi: 'update_emp',
            id: a,
            role: this.role,
          }
          this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
            if(res.success == true) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
              this.router.navigate(['/home/tabs/adtab3']);
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


  public back() {
    this.router.navigate(['/home/tabs/adtab3']);
  }
}
