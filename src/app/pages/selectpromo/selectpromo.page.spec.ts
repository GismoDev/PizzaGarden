import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectpromoPage } from './selectpromo.page';

describe('SelectpromoPage', () => {
  let component: SelectpromoPage;
  let fixture: ComponentFixture<SelectpromoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectpromoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectpromoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
