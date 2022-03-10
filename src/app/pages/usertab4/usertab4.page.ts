import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController, LoadingController, ActionSheetController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage';

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

import pdfMake from 'pdfMake/build/pdfmake'; 
import pdfFonts from 'pdfMake/build/vfs_fonts'; 
import { HttpClient } from '@angular/common/http';
import { ShowOrderdetailPage } from '../show-orderdetail/show-orderdetail.page';
import { ShowBillPage } from '../show-bill/show-bill.page';



pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew Bold.ttf',
    italics: 'THSarabunNew Italic.ttf',
    bolditalics: 'THSarabunNew BoldItalic.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}


@Component({
  selector: 'app-usertab4',
  templateUrl: './usertab4.page.html',
  styleUrls: ['./usertab4.page.scss'],
})
export class Usertab4Page implements OnInit {

  public viewbill:any = [];
  start: any;
  datastorage :any;

  id: string;
  empName;
  tableNumber;
  getTotal;

  a = 0;
  page = 0;
  startIndex = 0;
  endIndex = 9;
  numberindex = 1;

  constructor(public nav: NavController,public router: Router,
    private actRoute:ActivatedRoute,private storage: Storage,
    private accsPrvds:AccessProviders,private toastCtrl: ToastController,
    public navCtrl: NavController,private loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController,private modelCtrl: ModalController,
    private plt: Platform,private file: File,private fileOpener: FileOpener,
    private http: HttpClient) { 

      
    }

  ngOnInit() {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.viewbill);
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;

    this.loadbill();
  }

  loadbill(){
    this.viewbill = [];
    return new Promise(resolue => {
      let body = {
        aksi: 'report_billdayemp',
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
      component: ShowBillPage,
      cssClass: 'showbill-model',
      componentProps: { orderID: orderID,id : this.id }
      
    });
    return await model.present();
}

getArrayFormnumber(lenght){
    
  // console.log("จำนวนข้อมุล"+(this.vieworder.length/10),(this.vieworder.length%15));
  this.a = (this.viewbill.length)/9;
  return new Array(lenght = Math.ceil(this.a));
  
  
}

updateIndex(pageIndex){
  console.log(this.startIndex,this.endIndex,pageIndex);
  
  this.startIndex = pageIndex * 9;
  this.endIndex = this.startIndex + 9;
}

nextIndex(r){
  console.log(this.viewbill.length);
  console.log(this.startIndex,this.endIndex);
  if(this.endIndex <= this.viewbill.length){
  if(this.startIndex >= 0){
    this.startIndex += 9;
    this.endIndex += 9;
    }
  }
}

prevIndex(pageIndex){

  console.log(this.viewbill.length);
  console.log(this.startIndex,this.endIndex);
      if(this.endIndex >= 18){

      if(this.startIndex >= 0){
        this.startIndex -= 9;
        this.endIndex -= 9;
    }
  }
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
      }
      ]
    });
    await actionSheet.present();
  }

}
