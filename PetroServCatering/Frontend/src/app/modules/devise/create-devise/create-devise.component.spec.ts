import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateDeviseComponent } from './create-devise.component';

describe('CreateDeviseComponent', () => {
  let component: CreateDeviseComponent;
  let fixture: ComponentFixture<CreateDeviseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDeviseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDeviseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
