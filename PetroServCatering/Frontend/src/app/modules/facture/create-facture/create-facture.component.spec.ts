import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateFactureComponent } from './create-facture.component';

describe('CreateEmployeeComponent', () => {
  let component: CreateFactureComponent;
  let fixture: ComponentFixture<CreateFactureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFactureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
