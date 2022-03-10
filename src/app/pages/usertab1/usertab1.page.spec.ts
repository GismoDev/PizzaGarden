import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Usertab1Page } from './usertab1.page';

describe('Usertab1Page', () => {
  let component: Usertab1Page;
  let fixture: ComponentFixture<Usertab1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Usertab1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Usertab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
