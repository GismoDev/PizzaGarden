import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowBillPage } from './show-bill.page';

describe('ShowBillPage', () => {
  let component: ShowBillPage;
  let fixture: ComponentFixture<ShowBillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowBillPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowBillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
