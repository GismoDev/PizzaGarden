import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage';
import { ShowOrderdetailPage } from '../show-orderdetail/show-orderdetail.page';
import { ShowtotalPage } from '../showtotal/showtotal.page';
import { SelectpromoPage } from '../selectpromo/selectpromo.page';
import { ChangeTablePage } from '../change-table/change-table.page';

@Component({
  selector: 'app-usertab3',
  templateUrl: './usertab3.page.html',
  styleUrls: ['./usertab3.page.scss'],
})
export class Usertab3Page implements OnInit {

  public vieworderdetail:any = [];
  public vieworder:any = [];
  public viewonchangetable:any = [];
  public viewbill:any = [];
  datastorage:any;
  start:any;
  id: string;
  a = 0;
  b = 0;
  page = 0;


  data = [];
  getTotal;
  status;

  startIndex = 0;
  endIndex = 11;
  numberindex = 1;

  constructor(public nav: NavController,public router: Router,
    private actRoute:ActivatedRoute,private storage: Storage,
    private accsPrvds:AccessProviders,private toastCtrl: ToastController,
    public navCtrl: NavController,private loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController,
    private modelCtrl: ModalController,private alertCtrl: AlertController) { }

  ngOnInit() {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    console.log('page 3 :'+this.id);
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;
    this.showallorder();
    this.showallorderchangetable();
    this.loadbill();
    this.loadshowOrderDetail();
  }
  
  showallorder(){
    this.vieworder = [];
    return new Promise(resolue => {
      let body = {
        aksi: 'show_allorder',
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
         for(let datas of res){
            this.vieworder.push(datas);
         }
          resolue(true);
        console.log(res);
        
      });
    });
}

showallorderchangetable(){
  this.viewonchangetable = [];
  return new Promise(resolue => {
    let body = {
      aksi: 'show_allorderchangetable',
    }
    this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
       for(let datas of res){
          this.viewonchangetable.push(datas);
       }
        resolue(true);
      console.log(res);
      
    });
  });
}

loadbill(){
  this.viewbill = [];
  return new Promise(resolue => {
    let body = {
      aksi: 'report_bill',
    }
    this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
      for(let datas of res.arr){
         this.viewbill.push(datas);
      }
      this.getTotal = res.total.getTotal;
       resolue(true);
     console.log(res);
   });
 });
}


async doRefresh(event) {
  this.ionViewDidEnter();

  setTimeout(() => {
    event.target.complete();
  }, 200);

}

segmentChanged(day){
  this.viewbill = [];
  this.getTotal = '';
  console.log(day);
  
}

selectMonthEmp(month) {
  
  this.viewbill = [];
  let a = month.substring(0,7);
  
  return new Promise(resolue => {
    let body = {
      aksi: 'report_billMonthemp',
      a : a,
      empID : this.id
    }
    this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
      for(let datas of res.arr){
         this.viewbill.push(datas);
      }
      this.getTotal = res.total.getTotal;
       resolue(true);
     console.log(res);
   });
 });
}

async showOrderDetail(orderID,tableID) {
    let model = await this.modelCtrl.create({
      component: ShowOrderdetailPage,
      cssClass: 'showorderdtail-model',
      componentProps: 
      { orderID: orderID,
        id : this.id,
        tableID : tableID 
      }
    });
    return await model.present();
}
loadshowOrderDetail(){
  this.vieworderdetail = [];
  return new Promise(resolue => {
    let body = {
      aksi: 'show_orderdetail_Orderman',
      // orderResev: 'A',
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

async selectpromo(orderID) {

  return new Promise(resolue => {
    let body = {
      aksi: 'check_statusfood',
      orderID: orderID
    }
    this.accsPrvds.postData(body,'proses_api.php').subscribe(async (res:any)=>{
      if(res.success == false) {
         let model = await this.modelCtrl.create({
          component: SelectpromoPage,
          cssClass: 'selectpromo-model',
          componentProps: { 
            orderID: orderID,
            id: this.id
           }
          
        });
        return await model.present();
      } else {
        this.Alert(res.msg);
      }
    });
  });
}

async Alert(a){
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    message: a,
    backdropDismiss: false,
    buttons: [
      {
        text: 'OK',
        cssClass: 'alert-color',
        handler: () => {
          // this.add();
          this.alertCtrl.dismiss();
        }
      }
    ]
  });

  await alert.present();
}

  getArrayFormnumber(lenght){
    
    this.a = (this.vieworder.length)/11;
    return new Array(lenght = Math.ceil(this.a));
    
  }
  getArrayFormnumber2(lenght){

    this.b = (this.vieworderdetail.length)/11;
    return new Array(lenght = Math.ceil(this.b));
    
  }

  updateIndex(pageIndex){
    console.log(this.startIndex,this.endIndex,pageIndex);
    
    this.startIndex = pageIndex * 11;
    this.endIndex = this.startIndex + 11;
  }

  nextIndex(r){
    console.log(this.vieworder.length);
    console.log(this.startIndex,this.endIndex);
    if(this.endIndex <= this.vieworder.length || this.endIndex <= this.vieworderdetail.length){
    if(this.startIndex >= 0){
      this.startIndex += 11;
      this.endIndex += 11;
      }
    }
  }
  
  prevIndex(pageIndex){

    console.log(this.vieworder.length);
    console.log(this.startIndex,this.endIndex);
        if(this.endIndex >= 22){

        if(this.startIndex >= 0){
          this.startIndex -= 11;
          this.endIndex -= 11;
      }
    }
  }

  async changeTable(tableID) {
    let model = await this.modelCtrl.create({
      component: ChangeTablePage,
      cssClass: 'changetable-model',
      componentProps: { oldtableID: tableID }
      
    });
    return await model.present();
  }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  
  async signOut(a) {
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
      },
      {
        text: 'Profile Setting',
        icon: 'person-outline',
        handler: () => {
          localStorage.clear();
          this.nav.navigateBack(['/profile-setting/'+a]);
        }
      },
      {
        text: 'Change Password',
        icon: 'apps-outline',
        handler: () => {
          localStorage.clear();
          this.nav.navigateBack(['/change-password/'+a]);
        }
      },
      {
        text: 'test PDF',
        icon: 'print-outline',
        handler: () => {
          localStorage.clear();
          this.nav.navigateBack(['/test-pdf/'+a]);
        }
      }
      ]
    });
    await actionSheet.present();
  }

}
