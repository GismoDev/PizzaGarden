import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage';

@Component({
  selector: 'app-chef-udfood',
  templateUrl: './chef-udfood.page.html',
  styleUrls: ['./chef-udfood.page.scss'],
})
export class ChefUdfoodPage implements OnInit {

  public viewfood:any = [];
  datastorage:any;
  start:any;
  categoryID: string = "";
  public viewcategory:any = [];

  constructor(public nav: NavController,public router: Router,
    private actRoute:ActivatedRoute,private storage: Storage,
    private accsPrvds:AccessProviders,private toastCtrl: ToastController,
    public navCtrl: NavController,private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }
  
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;
    this.showFood();
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

  async update(a) {
    this.router.navigateByUrl('/chef-udmenufood/' +a);
  }
  
  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }

  async doRefresh(event) {
      this.ionViewDidEnter();
      setTimeout(() => {
        event.target.complete();
      }, 200);
    }

}
