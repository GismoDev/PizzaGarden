import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Usertab2Page } from './usertab2.page';

describe('Usertab2Page', () => {
  let component: Usertab2Page;
  let fixture: ComponentFixture<Usertab2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Usertab2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Usertab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
