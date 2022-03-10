import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage }from '@ionic/storage';
import { AccessProviders } from 'src/app/providers/access-providers';


const now = new Date().toString().substring(11,19);


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  tableID: string;
  id: string;
  start: any;
  datastorage :any;
  tableNumber: string;
  empName: string;
  guestName: string = "";
  guestAmount: string = "";
  reservTime: String = new Date().toString();

  disabledButton;

  mintime = now;
  myDate: String = new Date().toString().substring(25,16);

  hi = false;

  constructor(private actRoute:ActivatedRoute, private modalCtrl: ModalController,
    public router: Router,private accsPrvds:AccessProviders,
    public nav: NavController,private storage: Storage,
    private toastCtrl: ToastController,private alertCtrl: AlertController,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    // this.tableID = this.actRoute.snapshot.paramMap.get('tableID');
    // this.id = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.tableID,this.id);
    
  }

  mydate(event){
    //do something here
    console.log(event.substring(11,19));
    console.log(this.myDate);
    let time = event.substring(11,19);

    if(time >= this.myDate){
      this.hi = false;
      console.log("ปิ๊งป่อง");
    }
    else{
      // this.presentToast('เลือกเวลาจองใหม่');
      this.hi = true;
      console.log("ป่องปิ๊ง");
    }
    
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
        aksi: 'Show_reserv',
        id: this.id,
        tableID: this.tableID
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
        this.tableNumber = res.tableID[0].tableNumber;
        this.empName = res.empID[0].empName;
          resolue(true);
        console.log("aaaa: " +this.tableNumber,this.empName)
        console.log(res);
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

async add() {
  if(this.hi == true){
    this.Alert('โปรดเลือกเวลาจองใหม่');
    return;
  }
  else{
  // console.log(this.reservTime.substring(11,19));
  
  if(this.guestName == ""){
    this.presentToast('guestName is required');
  }else if(this.guestAmount == ""){
    this.presentToast('guestAmount is required');
  }else if(this.reservTime == ""){
    this.presentToast('reservTime is required');
  } else {
    this.disabledButton = true;
    const loader = await this.loadingCtrl.create({
      message: 'Please wait.....',
    });
    loader.present();

    return new Promise(resolve => {
      let body = {
        aksi: 'add_reserv',
        tableID: this.tableID,
        id: this.id,
        guestName: this.guestName,
        guestAmount: this.guestAmount,
        reservTime: this.reservTime.substring(11,16),
      }

      this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any) =>{
          if(res.success == true) {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
            this.modalCtrl.dismiss();
            location.reload();
            // this.router.navigate(['/user-dashboard/tabs/usertab1']);
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
            this.add();
          }
        }
      ]
    });

    await alert.present();
  }

  close() {
    this.modalCtrl.dismiss();
    // location.reload();
  }
}
