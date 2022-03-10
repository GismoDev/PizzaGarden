import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage';

@Component({
  selector: 'app-change-table',
  templateUrl: './change-table.page.html',
  styleUrls: ['./change-table.page.scss'],
})
export class ChangeTablePage implements OnInit {

  public viewtable:any = [];
  datastorage:any;
  start:any;
  id: string;

  oldtableID : string;

  disabledButton;

  constructor(public nav: NavController,public router: Router,
    private actRoute:ActivatedRoute,private storage: Storage,
    private accsPrvds:AccessProviders,private toastCtrl: ToastController,
    public navCtrl: NavController,private loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController,private modalCtrl: ModalController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    console.log("ไอดีโต๊ะเดิม "+this.oldtableID);
    
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;
    this.showtable();
    // this.showreserv();
    
  }
  
  showtable(){
    this.viewtable = [];
    return new Promise(resolue => {
      let body = {
        aksi: 'show_table',
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
         for(let datas of res){
            this.viewtable.push(datas);
         }
          resolue(true);
        console.log(res);
      });
    });
}

async newTable(newtableID) {

    return new Promise(resolve => {
      let body = {
        aksi: 'change_table',
        oldtableID: this.oldtableID,
        newtableID: newtableID
      }
      this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any) =>{
          if(res.success == true) { 
            this.disabledButton = false;
            this.modalCtrl.dismiss();
            location.reload();
          } else {
            this.disabledButton = false;
          }
      });
    });
}


  close() {
    this.modalCtrl.dismiss();
  }

}
