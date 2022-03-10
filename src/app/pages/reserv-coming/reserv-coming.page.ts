import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage';

@Component({
  selector: 'app-reserv-coming',
  templateUrl: './reserv-coming.page.html',
  styleUrls: ['./reserv-coming.page.scss'],
})
export class ReservComingPage implements OnInit {

  tableID: string;
  id: string;
  start: any;
  datastorage :any;
  tableNumber: string;
  empName: string;
  guestName: string;
  guestAmount: string;
  reservTime: string;
  reservID: string;

  disabledButton;

  constructor(private actRoute:ActivatedRoute, private modalCtrl: ModalController,
    public router: Router,private accsPrvds:AccessProviders,
    public nav: NavController,private storage: Storage,
    private toastCtrl: ToastController,private alertCtrl: AlertController,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    // this.tableID = this.actRoute.snapshot.paramMap.get('tableID');
    // this.id = this.actRoute.snapshot.paramMap.get('id');
    // console.log(this.tableID,this.id);
    
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;
    this.loadUpdate();
  }

  loadUpdate(){
    return new Promise(resolue => {
      let body = {
        aksi: 'show_comingReserv',
        id: this.id,
        tableID: this.tableID
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
        this.tableNumber = res.tableID[0].tableNumber;
        this.guestName = res.tableID[0].guestName;
        this.guestAmount = res.tableID[0].guestAmount;
        this.reservID = res.tableID[0].reservID;
        this.reservTime = res.tableID[0].reservTime;
        this.empName = res.empID[0].empName;
          resolue(true);
        console.log("aaaa: " +this.tableNumber,this.empName)
        console.log(res);
      });
    });
}

async add(tableID) {
  // console.log('sssss' +tableNumber);
  
  {
    this.disabledButton = true;
    const loader = await this.loadingCtrl.create({
      message: 'Please wait.....',
    });
    loader.present();

    return new Promise(resolve => {
      let body = {
        aksi: 'add_order',
        tableID: this.tableID,
        id: this.id,
        orderResev: 'R',
      }

      this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any) =>{
          if(res.success == true) {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
            this.modalCtrl.dismiss();
            this.router.navigate(['/order/'+this.tableID+'/'+this.id]);
            // this.router.navigate(['/user-dashboard/tabs/usertab2/', {tableID:tableID}]);
          } else {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
            
          }
      },(err)=> {
        loader.dismiss();
            this.disabledButton = false;
            this.presentAlert('Timeout');
      });

    });
  }
}

async cancel(reservID,tableID) {
  console.log(reservID+''+this.reservID);
  
  return new Promise(resolue => {
    let body = {
      aksi: 'cancel_Reserv',
      reservID: reservID,
      tableID : tableID
    }
    this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
      if(res.success == true) {
        this.presentToast(' cancel Successfuly ');
        this.ionViewDidEnter();
        this.router.navigate(['/user-dashboard/tabs/'+this.id+'/usertab2/'+this.id]);
        this.modalCtrl.dismiss();
        location.reload();
      } else {
        this.presentToast(' cancel Error ');
      }
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

  async doRefresh(event) {
    this.ionViewDidEnter();
  
    setTimeout(() => {
      event.target.complete();
    }, 200);
  
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
