import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Adtab1Page } from './adtab1.page';

describe('Adtab1Page', () => {
  let component: Adtab1Page;
  let fixture: ComponentFixture<Adtab1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Adtab1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Adtab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
