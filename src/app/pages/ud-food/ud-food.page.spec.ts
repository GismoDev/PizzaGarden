import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UdFoodPage } from './ud-food.page';

describe('UdFoodPage', () => {
  let component: UdFoodPage;
  let fixture: ComponentFixture<UdFoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdFoodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UdFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
