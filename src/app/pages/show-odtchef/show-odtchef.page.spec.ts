import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowOdtchefPage } from './show-odtchef.page';

describe('ShowOdtchefPage', () => {
  let component: ShowOdtchefPage;
  let fixture: ComponentFixture<ShowOdtchefPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOdtchefPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowOdtchefPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
