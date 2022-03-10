import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChefUdmenufoodPage } from './chef-udmenufood.page';

describe('ChefUdmenufoodPage', () => {
  let component: ChefUdmenufoodPage;
  let fixture: ComponentFixture<ChefUdmenufoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefUdmenufoodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChefUdmenufoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
