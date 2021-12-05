import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateFamilleComponent } from './create-famille.component';

describe('CreateFamilleComponent', () => {
  let component: CreateFamilleComponent;
  let fixture: ComponentFixture<CreateFamilleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFamilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
