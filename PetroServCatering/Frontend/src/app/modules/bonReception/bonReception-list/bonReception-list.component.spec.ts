import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BonReceptionListComponent } from './bonReception-list.component';


describe('BonReceptionListComponent', () => {
  let component: BonReceptionListComponent;
  let fixture: ComponentFixture<BonReceptionListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BonReceptionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonReceptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
