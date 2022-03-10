import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage';

@Component({
  selector: 'app-show-bill',
  templateUrl: './show-bill.page.html',
  styleUrls: ['./show-bill.page.scss'],
})
export class ShowBillPage implements OnInit {

  public viewbill:any = [];
  public viewodt:any = [];
  orderID: string;
  id: string;
  start: any;
  datastorage :any;

  empName;
  tableNumber;
  promoName;

  constructor(private actRoute:ActivatedRoute,private modelCtrl: ModalController,
    public router: Router,private accsPrvds:AccessProviders,
    public nav: NavController,private storage: Storage,
    private toastCtrl: ToastController,private alertCtrl: AlertController,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    console.log(this.orderID);
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;
    this.loadbill();
    this.loadODT();
  }

  loadbill(){
    this.viewbill = [];
    return new Promise(resolue => {
      let body = {
        aksi: 'Show_bill',
        orderID: this.orderID,
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
        for(let datas of res.arr){
           this.viewbill.push(datas);
        }
        this.empName = res.user.empName;
        this.tableNumber = res.table.tableNumber;
        this.promoName = res.promo.promoName;
         resolue(true);
       console.log(res);
     });
   });
}
loadODT(){
  return new Promise(resolue => {
    let body = {
      aksi: 'show_orderdetail',
      orderID: this.orderID,
    }
    this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
       for(let datas of res){
          this.viewodt.push(datas);
       }
        resolue(true);
      console.log(res);
    });
  });
}

  close() {
    this.modelCtrl.dismiss();
  }
}
