import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateBonReceptionComponent } from './create-bonReception.component';

describe('CreateEmployeeComponent', () => {
  let component: CreateBonReceptionComponent;
  let fixture: ComponentFixture<CreateBonReceptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBonReceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBonReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
