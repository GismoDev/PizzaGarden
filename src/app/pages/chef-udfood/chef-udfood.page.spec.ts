import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChefUdfoodPage } from './chef-udfood.page';

describe('ChefUdfoodPage', () => {
  let component: ChefUdfoodPage;
  let fixture: ComponentFixture<ChefUdfoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefUdfoodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChefUdfoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
