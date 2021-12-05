import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FactureListComponent } from './facture-list.component';


describe('FactureListComponent', () => {
  let component: FactureListComponent;
  let fixture: ComponentFixture<FactureListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FactureListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
