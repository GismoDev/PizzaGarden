import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage';
import { CartModelPage } from '../cart-model/cart-model.page';

@Component({
  selector: 'app-addmoremenu',
  templateUrl: './addmoremenu.page.html',
  styleUrls: ['./addmoremenu.page.scss'],
})
export class AddmoremenuPage implements OnInit {

  public allfood:any = [];
  public viewfood:any = [];
  datastorage:any;
  start:any;
  tableNumber: string;
  tableID: string;
  id: string;
  orderID: string;
  cartItemCount;
  public viewcategory:any = [];
  categoryID: string = "";

  disabledButton;

  constructor(public nav: NavController,
    private modelCtrl: ModalController,public router: Router,
    private actRoute:ActivatedRoute,private storage: Storage,
    private accsPrvds:AccessProviders,private toastCtrl: ToastController,
    public navCtrl: NavController,private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.orderID = this.actRoute.snapshot.paramMap.get('orderID');
    this.id = this.actRoute.snapshot.paramMap.get('id');
    // this.tableID = this.actRoute.snapshot.paramMap.get('tableID');
    console.log(this.orderID+'/'+this.id);

    
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;
    this.showFood();
    this.loadtable();
    this.showcategory();
  }

   showFood(){
      this.viewfood = [];
      return new Promise(resolue => {
        let body = {
          aksi: 'show_food',
        }
        this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
           for(let datas of res){
              this.viewfood.push(datas);
           }
            resolue(true);
          console.log(res);
        });
      });
  }

  showcategory(){
    this.viewcategory = [];
    return new Promise(resolue => {
      let body = {
        aksi: 'show_category',
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
         for(let datas of res){
            this.viewcategory.push(datas);
         }
          resolue(true);
        console.log(res);
      });
    });
}

async onChange(categoryID) {
  console.log("มาไหม = " +categoryID);
  this.viewfood = [];
  return new Promise(resolue => {
    let body = {
      aksi: 'show_typefood',
      categoryID: this.categoryID
    }
    this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
       for(let datas of res){
          this.viewfood.push(datas);
       }
        resolue(true);
      console.log(res);
    });
  });

}
  
  loadtable(){
    return new Promise(resolue => {
      let body = {
        aksi: 'Show_orderonaddmore',
        orderID: this.orderID
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
        this.tableNumber = res.tableID[0].tableNumber;
        // this.orderID = res.tableID[0].orderID;
          resolue(true);
        console.log("aaaa: " +this.tableNumber+"bbb"+this.orderID)
        console.log(res);
      });
    });
}

async addToCart(viewfood,orderID) {
  // console.log(viewfood);
  this.allfood.push(viewfood);
  console.log(this.allfood);
  // this.cartItemCount = this.allfood.length;
}


async openCart(orderID) {

let model = await this.modelCtrl.create({
component: CartModelPage,
cssClass: 'cart-model',
componentProps: {
  orderID: orderID,
  allfood: this.allfood,
  id: this.id
  }

});
model.present();
}

  back() {
    this.router.navigate(['/user-dashboard/tabs/'+this.id+'/usertab3/'+this.id]);
  }

}
