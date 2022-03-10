import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, ActionSheetController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage';
import { ShowOrderdetailPage } from '../show-orderdetail/show-orderdetail.page';
import { ShowOdtchefPage } from '../show-odtchef/show-odtchef.page';

@Component({
  selector: 'app-user-chef',
  templateUrl: './user-chef.page.html',
  styleUrls: ['./user-chef.page.scss'],
})
export class UserChefPage implements OnInit {

  public vieworder:any = [];
  datastorage:any;
  start:any;
  id: string;
  public vieworderdetail:any = [];
  orderID: string;

  startIndex = 0;
  endIndex = 11;
  numberindex = 1;
  a = 0;
  b = 0;
  page = 0;
  
  asd;

  getTotal;

  disabledButton;

  constructor(public nav: NavController,public router: Router,
    private actRoute:ActivatedRoute,private storage: Storage,
    private accsPrvds:AccessProviders,private toastCtrl: ToastController,
    public navCtrl: NavController,private loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController,
    private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;
    // this.showallorder();
    this.loadODT();
  }

  loadODT(){
    if(this.asd == 1){
      
      this.vieworderdetail = [];
      return new Promise(resolue => {
        let body = {
          aksi: 'show_orderdetail2',
          orderResev : 'O',
        }
        this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
           for(let datas of res){
              this.vieworderdetail.push(datas);
  
           }
            resolue(true);
          console.log(res);
        });
      });
    } else if(this.asd == 2){
      this.vieworderdetail = [];
      return new Promise(resolue => {
        let body = {
          aksi: 'show_orderdetail2',
          orderResev : 'R',
        }
        this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
           for(let datas of res){
              this.vieworderdetail.push(datas);
  
           }
            resolue(true);
          console.log(res);
        });
      });
    } else {
      this.vieworderdetail = [];
      return new Promise(resolue => {
        let body = {
          aksi: 'show_orderdetail2',
          orderResev : 'O',
        }
        this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
           for(let datas of res){
              this.vieworderdetail.push(datas);
  
           }
            resolue(true);
          console.log(res);
        });
      });
    }
}

async update_order(odt) {
  
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
            location.reload();
          } else {
            loader.dismiss();
            this.disabledButton = false;
            // this.presentToast(res.msg);
            
          }
        });
      });
  }
}

segmentChanged(day){
  // this.vieworderdetail = [];
  this.getTotal = '';
  console.log(day);
  this.asd = day;

  if(day == 1){
      
    this.vieworderdetail = [];
    return new Promise(resolue => {
      let body = {
        aksi: 'show_orderdetail2',
        orderResev : 'O',
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
         for(let datas of res){
            this.vieworderdetail.push(datas);

         }
          resolue(true);
        console.log(res);
      });
    });
  } else if(day == 2){
    this.vieworderdetail = [];
    return new Promise(resolue => {
      let body = {
        aksi: 'show_orderdetail2',
        orderResev : 'R',
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
         for(let datas of res){
            this.vieworderdetail.push(datas);

         }
          resolue(true);
        console.log(res);
      });
    });
  }
  
}

async doRefresh(event) {
  this.ionViewDidEnter();
  setTimeout(() => {
    event.target.complete();
  }, 200);

}

async doRefresh2(event) {
  // this.ionViewDidEnter();
  this.segmentChanged(2);
  setTimeout(() => {
    event.target.complete();
  }, 200);

}
async showOrderDetail(orderID) {
    let model = await this.modalCtrl.create({
      component: ShowOdtchefPage,
      cssClass: 'showodtchef-model',
      componentProps: { orderID: orderID }
      
    });
    return await model.present();
}

getArrayFormnumber(lenght){
    
  this.a = (this.vieworderdetail.length)/11;
  return new Array(lenght = Math.ceil(this.a));
  
  
}

updateIndex(pageIndex){
  console.log(this.startIndex,this.endIndex,pageIndex);
  
  this.startIndex = pageIndex * 11;
  this.endIndex = this.startIndex + 11;
}

nextIndex(r){
  console.log(this.vieworderdetail.length);
  console.log(this.startIndex,this.endIndex);
  if(this.endIndex <= this.vieworderdetail.length){
  if(this.startIndex >= 0){
    this.startIndex += 11;
    this.endIndex += 11;
    }
  }
}

prevIndex(pageIndex){

  console.log(this.vieworderdetail.length);
  console.log(this.startIndex,this.endIndex);
      if(this.endIndex >= 22){

      if(this.startIndex >= 0){
        this.startIndex -= 11;
        this.endIndex -= 11;
    }
  }
}

  
async signOut() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Setting',
    cssClass: 'EditIcon',
    buttons: [{
      text: 'Logout',
      icon: 'power',
      handler: () => {
        localStorage.clear();
        this.nav.navigateBack(['/login']);
      }
    }]
  });
  await actionSheet.present();
}

}
