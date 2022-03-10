import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from 'src/app/providers/access-providers';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Storage }from '@ionic/storage';

@Component({
  selector: 'app-ud-food',
  templateUrl: './ud-food.page.html',
  styleUrls: ['./ud-food.page.scss'],
})
export class UdFoodPage implements OnInit {

  foodName: string = "";
  price: string = "";
  id: string;
  start: any;
  datastorage :any;
  idupdate: string;
  categoryID: string = "";
  public viewcategory:any = [];
  disabledButton;

  constructor(public router: Router,private accsPrvds:AccessProviders,
    public nav: NavController,
    private actRoute:ActivatedRoute,private storage: Storage,
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      
      this.datastorage = res;
    });
    this.start = 0;
    this.showcategory();
    this.loadUpdate();
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

  loadUpdate(){
    
    return new Promise(resolue => {
      let body = {
        aksi: 'ShowUpdate_food',
        id: this.id
      }
      this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
        this.foodName = res[0].foodName;
        this.price = res[0].price;
        this.categoryID = res[0].categoryID;
        this.idupdate = res[0].foodID;
          resolue(true);
        console.log("menu: " +res[0].foodName,res[0].price,res[0].categoryID,res[0].foodID)
        console.log(res);
      });
    });
}

  async update(a) {
    // if(this.foodName == ""){
    //   this.presentToast('Foodname is required');
    // }else if(this.price == ""){
    //   this.presentToast('Price is required');
    // }else if(this.categoryID == ""){
    //   this.presentToast('category is required');
    // } else 
    {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait.....',
      });
      loader.present();
    

        return new Promise(resolue => {
          let body = {
            aksi: 'update_food',
            id: a,
            foodName: this.foodName,
            price: this.price,
            categoryID: this.categoryID,
          }
          this.accsPrvds.postData(body,'proses_api.php').subscribe((res:any)=>{
            if(res.success == true) {
              loader.dismiss();
              this.disabledButton = false;
              // this.presentToast(res.msg);
              this.router.navigateByUrl('/show-food');
            } else {
              loader.dismiss();
              this.disabledButton = false;
              // this.presentToast(res.msg);
              
            }
          });
        });
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

  public back() {
    this.router.navigateByUrl('/show-food');
  }

}
