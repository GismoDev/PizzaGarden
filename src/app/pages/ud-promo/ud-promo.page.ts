import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Storage }from '@ionic/storage';

@Component({
  selector: 'app-ud-promo',
  templateUrl: './ud-promo.page.html',
  styleUrls: ['./ud-promo.page.scss'],
})
export class UdPromoPage implements OnInit {

  promoName: string = "";
  detail: string = "";
  sale: string = "";
  Date_start: string = "";
  Date_end: string = "";
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
        aksi: 'ShowUpdate_promo',
        id: this.id
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
        this.promoName = res[0].promoName;
        this.detail = res[0].detail;
        this.sale = res[0].sale;
        this.Date_start = res[0].Date_start;
        this.Date_end = res[0].Date_end;
        this.idupdate = res[0].promoID;
          resolue(true);
        console.log("promotion: " +res[0].promoName,res[0].detail,res[0].sale,res[0].Date_start,res[0].Date_end,res[0].promoID)
        console.log(res);
      });
    });
}

  async update(a) {
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
    

        return new Promise(resolue => {
          let body = {
            aksi: 'update_promo',
            id: a,
            promoName: this.promoName,
            detail: this.detail,
            sale: this.sale,
            Date_start: this.Date_start.substring(0,10),
            Date_end: this.Date_end.substring(0,10),
          }
          this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
            if(res.success == true) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
              this.router.navigateByUrl('/show-promo');
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
    this.router.navigateByUrl('/show-promo');
  }
}
