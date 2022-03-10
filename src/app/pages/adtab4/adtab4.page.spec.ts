import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Adtab4Page } from './adtab4.page';

describe('Adtab4Page', () => {
  let component: Adtab4Page;
  let fixture: ComponentFixture<Adtab4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Adtab4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Adtab4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
