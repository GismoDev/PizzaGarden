import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage';

@Component({
  selector: 'app-show-odtchef',
  templateUrl: './show-odtchef.page.html',
  styleUrls: ['./show-odtchef.page.scss'],
})
export class ShowOdtchefPage implements OnInit {

  public vieworderdetail:any = [];
  orderID: string;
  start: any;
  datastorage :any;
  order_menustatus: string;
  disabledButton;
  okay = [];

  constructor(private actRoute:ActivatedRoute, private modalCtrl: ModalController,
    public router: Router,private accsPrvds:AccessProviders,
    public nav: NavController,private storage: Storage,
    private toastCtrl: ToastController,private alertCtrl: AlertController,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;
    this.loadODT();
  }

  loadODT(){
    
    return new Promise(resolue => {
      let body = {
        aksi: 'show_orderdetail',
        orderID: this.orderID
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
         for(let datas of res){
            this.vieworderdetail.push(datas);
            this.okay.push(datas.odt_status);
         }
          resolue(true);
        console.log(res);

        // const result = this.okay.find((member) => {
        //   return member == "K"
        // })
        // console.log("1234"+result);
        
        // if(result == "K"){
        //   this.goagain('Y');
        // }else{
        //   this.goagain('X');
        // }
        
      });
    });
}
    goagain(value){
      return new Promise(resolue => {
        let body = {
          aksi: 'update_orderstatus_by_odt',
          orderID: this.orderID,
          value:value
        }
        this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
          if(res.success == true) {

            this.disabledButton = false;
            // this.presentToast(res.msg);

          } else {

            this.disabledButton = false;
            // this.presentToast(res.msg);
            
          }
        });
      });
    }

async update_order(odt) {
  // if(this.role == ""){
  //   this.presentToast('role is required');
  // } else 
  
  {
    this.disabledButton = true;
    const loader = await this.loadingCtrl.create({
      message: 'Please wait.....',
    });
    loader.present();
  

      return new Promise(resolue => {
        let body = {
          aksi: 'update_order',
          orderDetailID: odt
        }
        this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
          if(res.success == true) {
            loader.dismiss();
            this.disabledButton = false;
            // this.presentToast(res.msg);
            this.modalCtrl.dismiss();
            this.router.navigate(['/chef-dashboard/tabs/cheftab1']);
          } else {
            loader.dismiss();
            this.disabledButton = false;
            // this.presentToast(res.msg);
            
          }
        });
      });
  }
}


  close() {
    this.modalCtrl.dismiss();
  }


}
