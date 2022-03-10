import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private actRoute:ActivatedRoute,public nav:NavController) { }

  ngOnInit() {
  }

  signOut() {
    this.nav.navigateBack(['/login']);
  }
}
