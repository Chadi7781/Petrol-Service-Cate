import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FactureDetailsComponent } from './facture-details.component';


describe('FactureDetailsComponent', () => {
  let component: FactureDetailsComponent;
  let fixture: ComponentFixture<FactureDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FactureDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
