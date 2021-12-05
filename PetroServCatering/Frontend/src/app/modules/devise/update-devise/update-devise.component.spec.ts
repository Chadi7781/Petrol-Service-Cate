import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateDeviseComponent } from './update-devise.component';

describe('UpdateDeviseComponent', () => {
  let component: UpdateDeviseComponent;
  let fixture: ComponentFixture<UpdateDeviseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDeviseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDeviseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
