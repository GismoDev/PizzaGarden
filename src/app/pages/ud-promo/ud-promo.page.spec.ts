import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UdPromoPage } from './ud-promo.page';

describe('UdPromoPage', () => {
  let component: UdPromoPage;
  let fixture: ComponentFixture<UdPromoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdPromoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UdPromoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
