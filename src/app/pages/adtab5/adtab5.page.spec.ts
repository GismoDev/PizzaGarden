import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Adtab5Page } from './adtab5.page';

describe('Adtab5Page', () => {
  let component: Adtab5Page;
  let fixture: ComponentFixture<Adtab5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Adtab5Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Adtab5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
