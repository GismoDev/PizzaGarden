import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UdEmpPage } from './ud-emp.page';

describe('UdEmpPage', () => {
  let component: UdEmpPage;
  let fixture: ComponentFixture<UdEmpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UdEmpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UdEmpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
