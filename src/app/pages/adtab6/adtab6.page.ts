import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, ActionSheetController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage';
import { ShowOrderdetailPage } from '../show-orderdetail/show-orderdetail.page';
import { ShowBillPage } from '../show-bill/show-bill.page';

@Component({
  selector: 'app-adtab6',
  templateUrl: './adtab6.page.html',
  styleUrls: ['./adtab6.page.scss'],
})
export class Adtab6Page implements OnInit {

  public viewbill:any = [];
  public viewbill2:any = [];
  public viewemp:any = [];
  start: any;
  datastorage :any;
  getTotal;

  date;
  month;


  startIndex = 0;
  endIndex = 9;
  numberindex = 1;
  a = 0;

  empID;

  constructor(public nav: NavController,public router: Router,
    private actRoute:ActivatedRoute,private storage: Storage,
    private accsPrvds:AccessProviders,private toastCtrl: ToastController,
    public navCtrl: NavController,private loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController,
    private modelCtrl: ModalController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;
    this.loadbill();
    this.showEmployee();
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

showEmployee(){
  this.viewemp = [];
  return new Promise(resolue => {
    let body = {
      aksi: 'show_emp',
    }
    this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
       for(let datas of res){
          this.viewemp.push(datas);
       }
        resolue(true);
      console.log(res);
    });
  });
}

  selectDate(date){
    this.viewbill = []; 
    let a = date.substring(0,10);
    
    return new Promise(resolue => {
      let body = {
        aksi: 'report_billday',
        a : a
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
  segmentChanged(day){
    this.viewbill = [];
    this.getTotal = '';
    this.month = '';
    this.date = '';
    this.empID = '';
    console.log(day);
    if(day == 4){
      
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
    
  }

  selectMonth(month) {
    this.viewbill = [];
    let a = month.substring(0,7);
    
    return new Promise(resolue => {
      let body = {
        aksi: 'report_billday',
        a : a
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

  selectEmp(empID) {
    this.viewbill = [];
    let a = empID.substring(0,7);
    
    return new Promise(resolue => {
      let body = {
        aksi: 'report_billdayemp',
        empID : a
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

  selectMonthEmp(month,empID) {
    console.log(empID);
    
    this.viewbill = [];
    let a = month.substring(0,7);
    
    return new Promise(resolue => {
      let body = {
        aksi: 'report_billMonthemp',
        a : a,
        empID : empID
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
      componentProps: { orderID: orderID  }
      
    });
    return await model.present();
}

  // getArrayFormnumber(lenght){
    
  //   this.a = (this.viewbill.length)/9;
  //   return new Array(lenght = Math.ceil(this.a));
    
    
  // }

  // updateIndex(pageIndex){
  //   // console.log(this.startIndex,this.endIndex,pageIndex);
    
  //   this.startIndex = pageIndex * 9;
  //   this.endIndex = this.startIndex + 9;
  // }

  // nextIndex(r){
  //   // console.log(this.viewbill.length);
  //   // console.log(this.startIndex,this.endIndex);
  //   if(this.endIndex <= this.viewbill.length){
  //   if(this.startIndex >= 0){
  //     this.startIndex += 9;
  //     this.endIndex += 9;
  //     }
  //   }
  // }
  
  // prevIndex(pageIndex){

  //   // console.log(this.viewbill.length);
  //   // console.log(this.startIndex,this.endIndex);
  //       if(this.endIndex >= 18){

  //       if(this.startIndex >= 0){
  //         this.startIndex -= 9;
  //         this.endIndex -= 9;
  //     }
  //   }
  // }

}
