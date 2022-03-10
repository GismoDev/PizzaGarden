import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddmoremenuPage } from './addmoremenu.page';

describe('AddmoremenuPage', () => {
  let component: AddmoremenuPage;
  let fixture: ComponentFixture<AddmoremenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmoremenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddmoremenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
