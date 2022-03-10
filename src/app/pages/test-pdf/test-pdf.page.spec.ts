import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestPdfPage } from './test-pdf.page';

describe('TestPdfPage', () => {
  let component: TestPdfPage;
  let fixture: ComponentFixture<TestPdfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPdfPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestPdfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
