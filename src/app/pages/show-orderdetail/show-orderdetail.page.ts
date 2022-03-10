import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage';

@Component({
  selector: 'app-show-orderdetail',
  templateUrl: './show-orderdetail.page.html',
  styleUrls: ['./show-orderdetail.page.scss'],
})
export class ShowOrderdetailPage implements OnInit {

  public vieworderdetail:any = [];
  public vieworderdetail2:any = [];
  orderID: string;
  tableID: string;
  id: string;
  start: any;
  datastorage :any;
  status;
  okay = [];

  disabledButton;

  constructor(private actRoute:ActivatedRoute, private modalCtrl: ModalController,
    public router: Router,private accsPrvds:AccessProviders,
    public nav: NavController,private storage: Storage,
    private toastCtrl: ToastController,private alertCtrl: AlertController,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    console.log(this.orderID, this.id);

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
        aksi: 'show_orderdetail3',
        orderID: this.orderID
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
         
         for(let datas of res.arr){
            this.vieworderdetail.push(datas);
         }
         for(let datas of res.arr2){
          this.vieworderdetail.push(datas);
        }
        for(let datas of res.arr3){
          this.vieworderdetail.push(datas);
        }
         this.status =  this.vieworderdetail[0].orderStatus;
          resolue(true);
        console.log(res);
        console.log(this.vieworderdetail);
        // console.log(this.vieworderdetail2);
  
      });
    });
}

  cancle(a,foodID) {
    return new Promise(resolue => {
      let body = {
        aksi: 'cancle_orderDetail',
        orderDetailID: a,
        foodID: foodID,
        orderID : this.orderID
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
        if(res.success == true) {
          this.presentToast(' Delete Successfuly ');
          this.modalCtrl.dismiss();
          location.reload();
        //   const result = this.okay.find((member) => {
        //     return member == "K"
        //   })
        //   console.log("1234"+result);
          
        //   if(result == "K"){
        //     this.goagain('Y');
        //   }else{
        //     this.goagain('X');
        //   }
        } else {
          this.presentToast(' Delete Error ');
        }
      });
    });

  }
  addmoremenu() {
    this.nav.navigateRoot(['/addmoremenu/'+this.id+'/'+this.orderID]);
    this.modalCtrl.dismiss();
  }

  cancleOrder() {
    return new Promise(resolue => {
      let body = {
        aksi: 'cancle_order',
        orderID: this.orderID,
        tableID: this.tableID
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
        if(res.success == true) {
          this.presentToast(' Delete Successfuly ');
          location.reload();
        } else {
          this.presentToast(' Delete Error ');
        }
      });
    });
  }

  async doRefresh(event) {
    this.ionViewDidEnter();
  
    setTimeout(() => {
      event.target.complete();
    }, 200);
  
  }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
