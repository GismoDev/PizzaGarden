import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Usertab3Page } from './usertab3.page';

describe('Usertab3Page', () => {
  let component: Usertab3Page;
  let fixture: ComponentFixture<Usertab3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Usertab3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Usertab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
