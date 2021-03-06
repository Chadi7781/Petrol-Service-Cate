import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateFactureComponent } from './update-facture.component';

describe('UpdateFactureComponent', () => {
  let component: UpdateFactureComponent;
  let fixture: ComponentFixture<UpdateFactureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFactureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
