import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeviseDetailsComponent } from './devise-details.component';

describe('DeviseDetailsComponent', () => {
  let component: DeviseDetailsComponent;
  let fixture: ComponentFixture<DeviseDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
