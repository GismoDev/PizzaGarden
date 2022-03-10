import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeTablePage } from './change-table.page';

describe('ChangeTablePage', () => {
  let component: ChangeTablePage;
  let fixture: ComponentFixture<ChangeTablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTablePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
