import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserChefPage } from './user-chef.page';

describe('UserChefPage', () => {
  let component: UserChefPage;
  let fixture: ComponentFixture<UserChefPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChefPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserChefPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
