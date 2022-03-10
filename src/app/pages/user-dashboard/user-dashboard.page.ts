import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage implements OnInit {
  
  id: string;

  constructor(private actRoute:ActivatedRoute,public router: Router,private storage: Storage) { }

  ngOnInit() {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    // this.router.navigate(['/user-dashboard/tabs/usertab3/'+this.id]);
  }
  tab1(){
    this.router.navigate(['/user-dashboard/tabs/'+this.id+'/usertab1/'+this.id]);
  }
  tab2(){
    this.router.navigate(['/user-dashboard/tabs/'+this.id+'/usertab2/'+this.id]);
  }
  tab3(){
    this.router.navigate(['/user-dashboard/tabs/'+this.id+'/usertab3/'+this.id]);
  }
  tab4(){
    this.router.navigate(['/user-dashboard/tabs/'+this.id+'/usertab4/'+this.id]);
  }
}
