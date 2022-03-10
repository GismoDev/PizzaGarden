import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage';

@Component({
  selector: 'app-show-promo',
  templateUrl: './show-promo.page.html',
  styleUrls: ['./show-promo.page.scss'],
})
export class ShowPromoPage implements OnInit {

  public viewpromo:any = [];
  datastorage:any;
  start:any;

  constructor(public nav: NavController,public router: Router,
    private actRoute:ActivatedRoute,private storage: Storage,
    private accsPrvds:AccessProviders,private toastCtrl: ToastController,
    public navCtrl: NavController,private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;
    this.showPromo();
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

async delete(a) {
  return new Promise(resolue => {
    let body = {
      aksi: 'del_promo',
      id: a
    }
    this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
      if(res.success == true) {
        this.presentToast(' Delete Successfuly ');
        this.ionViewDidEnter();
      } else {
        this.presentToast(' Delete Error ');
      }
    });
  });
}

async update(a) {
  return new Promise(resolue => {
    this.router.navigateByUrl('/ud-promo/' +a);
  });
}

async presentToast(a){
  const toast = await this.toastCtrl.create({
    message: a,
    duration: 1500,
    position: 'bottom'
  });
  toast.present();
}

async doRefresh(event) {
  this.ionViewDidEnter();

  setTimeout(() => {
    event.target.complete();
  }, 200);
}

  public back() {
    this.router.navigateByUrl('/home/tabs/adtab2');
  }

}
