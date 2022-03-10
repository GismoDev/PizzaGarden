import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Adtab3Page } from './adtab3.page';

describe('Adtab3Page', () => {
  let component: Adtab3Page;
  let fixture: ComponentFixture<Adtab3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Adtab3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Adtab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
