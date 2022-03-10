import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartModelPage } from './cart-model.page';

describe('CartModelPage', () => {
  let component: CartModelPage;
  let fixture: ComponentFixture<CartModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartModelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
