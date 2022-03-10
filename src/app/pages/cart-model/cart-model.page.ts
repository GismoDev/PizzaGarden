import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart-model',
  templateUrl: './cart-model.page.html',
  styleUrls: ['./cart-model.page.scss'],
})
export class CartModelPage implements OnInit {

  public cart:any = [];
  datastorage:any;
  start:any;
  orderID:string;
  public allfood:any = [];
  korn: number=1;
  id: string;
  cartItemCount;
  disabledButton;

 
  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController,
    private storage: Storage, private accsPrvds:AccessProviders,
    private toastCtrl: ToastController,public router: Router,private actRoute:ActivatedRoute) { }
 
  ngOnInit() {
    // this.id = this.actRoute.snapshot.paramMap.get('id');
    console.log('รับ: ' +this.allfood);
    console.log('รับorderID: ' +this.orderID);
    console.log('รับID: ' +this.id);
    
    
  }
 
  
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;
    this.showallfood();
  }
 
  showallfood(){
    this.cart = [];
    return new Promise(resolue => {
      let body = {
        aksi: 'show_allfood',
        orderID: this.orderID,
        allfood: this.allfood
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
         for(let datas of res){
            this.cart.push(datas);
         }
          resolue(true);
        console.log(res);
      });
    });
}

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  removeCartItem(i){
    console.log(i);
    this.cart.splice(i,1);
    this.allfood.splice(i,1);
    this.cartItemCount = this.allfood.length;
    console.log('kkkk'+this.cart);
    console.log('all food'+this.allfood);
    
  }
 
  close() {
    this.modalCtrl.dismiss();
  }

  async checkout() {
    console.log('อิอิ: ' +this.orderID,this.cart);
    let n_foodID = [];
    let n_amount = [];
    // for(let i = 0; i <= this.cart.length;i++){
      for(let datas of this.cart){
      n_foodID.push(datas.foodID);
      n_amount.push(datas.amount);
      // console.log("ไอดีที่"+this.cart[i].foodID);
      // console.log("จำนวน"+this.cart[i].amount);
    }
    console.log("fooid = "+n_foodID);
    console.log("n_amount = "+n_amount);
   return new Promise(resolve => {
        let body = {
          aksi: 'add_orderDetail',
          orderID: this.orderID,
          n_foodID,
          n_amount
        }
        this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any) =>{
            if(res.success == true) {
              
              this.disabledButton = false;
              this.presentToast(res.msg);
              console.log(res.msg);
              this.modalCtrl.dismiss();
              this.cart = [];
              this.allfood = [];
              this.router.navigate(['/user-dashboard/tabs/'+this.id+'/usertab3/' +this.id]);
              // location.reload();
              // this.router.navigate(['/user-dashboard/tabs/usertab2/', {tableID:tableID}]);
            } else {
              
              this.disabledButton = false;
              this.presentToast(res.msg);
              
            }
        },(err)=> {
         
              this.disabledButton = false;
              this.presentAlert('Timeout');
        });
  
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
    
    async presentAlert(a){
        const alert = await this.alertCtrl.create({
          header: a,
          backdropDismiss: false,
          buttons: [
            {
              text: 'Close',
              handler: (blah) => {
                console.log('Confirm Cancel: blah');
                // action
              }
            }, {
              text: 'Try Again',
              handler: () => {
                // this.add(tableNumber);
              }
            }
          ]
        });
    
        await alert.present();
      }
      
}
