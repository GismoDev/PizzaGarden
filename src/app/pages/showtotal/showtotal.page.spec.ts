import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowtotalPage } from './showtotal.page';

describe('ShowtotalPage', () => {
  let component: ShowtotalPage;
  let fixture: ComponentFixture<ShowtotalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowtotalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowtotalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
