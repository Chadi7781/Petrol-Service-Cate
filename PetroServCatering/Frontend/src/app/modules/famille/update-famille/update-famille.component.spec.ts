import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateFamilleComponent } from './update-famille.component';

describe('UpdateFamilleComponent', () => {
  let component: UpdateFamilleComponent;
  let fixture: ComponentFixture<UpdateFamilleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFamilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
