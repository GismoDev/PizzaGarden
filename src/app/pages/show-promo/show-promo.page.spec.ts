import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowPromoPage } from './show-promo.page';

describe('ShowPromoPage', () => {
  let component: ShowPromoPage;
  let fixture: ComponentFixture<ShowPromoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPromoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowPromoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
