import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Storage }from '@ionic/storage';
import { getLocaleTimeFormat } from '@angular/common';

@Component({
  selector: 'app-chef-udmenufood',
  templateUrl: './chef-udmenufood.page.html',
  styleUrls: ['./chef-udmenufood.page.scss'],
})
export class ChefUdmenufoodPage implements OnInit {

  status: string;
  foodID: string;
  foodName: string;
  start: any;
  datastorage :any;
  statusUpdate: string;
  disabledButton;

  constructor(public router: Router,private accsPrvds:AccessProviders,
    public nav: NavController,
    private actRoute:ActivatedRoute,private storage: Storage,
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.foodID = this.actRoute.snapshot.paramMap.get('foodID');
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
        aksi: 'Showchefupdate_food',
        foodID: this.foodID
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
        this.status = res[0].status;
        this.foodName = res[0].foodName;
        this.statusUpdate = res[0].foodID;
          resolue(true);
        console.log("promotion: " +res[0].status,res[0].foodID,res[0].foodName)
        console.log(res);
      });
    });
}

  async update(a) {
    if(this.status == ""){
      this.presentToast('status is required');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait.....',
      });
      loader.present();
    

        return new Promise(resolue => {
          let body = {
            aksi: 'chefupdate_food',
            foodID: a,
            status: this.status,
          }
          this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
            if(res.success == true) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
              this.router.navigate(['/chef-dashboard/tabs/cheftab2']);
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
    this.router.navigate(['/chef-dashboard/tabs/cheftab2']);
  }

}
