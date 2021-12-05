import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateSousFamilleComponent } from './update-sousFamille.component';

describe('UpdateSousFamilleComponent', () => {
  let component: UpdateSousFamilleComponent;
  let fixture: ComponentFixture<UpdateSousFamilleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSousFamilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSousFamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
