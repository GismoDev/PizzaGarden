import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage }from '@ionic/storage';

@Component({
  selector: 'app-show-food',
  templateUrl: './show-food.page.html',
  styleUrls: ['./show-food.page.scss'],
})
export class ShowFoodPage implements OnInit {

  public viewfood:any = [];
  datastorage:any;
  start:any;
  categoryName: string;
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

  async delete(a) {
    return new Promise(resolue => {
      let body = {
        aksi: 'del_food',
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
    this.router.navigateByUrl('/ud-food/' +a);
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

  public back() {
    this.router.navigateByUrl('/home');
  }

}
