import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateBonReceptionComponent } from './update-bonReception.component';

describe('UpdateBonReceptionComponent', () => {
  let component: UpdateBonReceptionComponent;
  let fixture: ComponentFixture<UpdateBonReceptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBonReceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBonReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
