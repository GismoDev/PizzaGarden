import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Usertab4Page } from './usertab4.page';

describe('Usertab4Page', () => {
  let component: Usertab4Page;
  let fixture: ComponentFixture<Usertab4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Usertab4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Usertab4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
