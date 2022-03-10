import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Adtab6Page } from './adtab6.page';

describe('Adtab6Page', () => {
  let component: Adtab6Page;
  let fixture: ComponentFixture<Adtab6Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Adtab6Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Adtab6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
