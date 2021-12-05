import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BonReceptionDetailsComponent } from './bonReception-details.component';


describe('BonReceptionDetailsComponent', () => {
  let component: BonReceptionDetailsComponent;
  let fixture: ComponentFixture<BonReceptionDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BonReceptionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonReceptionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
