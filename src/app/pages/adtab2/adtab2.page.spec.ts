import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Adtab2Page } from './adtab2.page';

describe('Adtab2Page', () => {
  let component: Adtab2Page;
  let fixture: ComponentFixture<Adtab2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Adtab2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Adtab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
