import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage';

@Component({
  selector: 'app-adtab3',
  templateUrl: './adtab3.page.html',
  styleUrls: ['./adtab3.page.scss'],
})
export class Adtab3Page implements OnInit {

  public viewEmployee:any = [];
  datastorage:any;
  start:any;

  constructor(public nav: NavController,public router: Router,
    private actRoute:ActivatedRoute,private storage: Storage,
    private accsPrvds:AccessProviders,private toastCtrl: ToastController,
    public navCtrl: NavController,private loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }
  
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;
    this.showEmployee();
  }

  showEmployee(){
    this.viewEmployee = [];
    return new Promise(resolue => {
      let body = {
        aksi: 'show_emp',
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
         for(let datas of res){
            this.viewEmployee.push(datas);
         }
          resolue(true);
        console.log(res);
      });
    });
}

async delete(a) {
  return new Promise(resolue => {
    let body = {
      aksi: 'del_emp',
      id: a
    }
    this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
      if(res.success == true) {
        this.presentToast(' Delete Successfuly ');
        this.ionViewDidEnter();
      } else {
        this.presentToast(' Delete Error ');
      }
    });
  });
}

async update(a) {
  return new Promise(resolue => {
    this.router.navigateByUrl('/ud-emp/' +a);
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

async doRefresh(event) {
    this.ionViewDidEnter();

    setTimeout(() => {
      event.target.complete();
    }, 200);
  
  }

}
