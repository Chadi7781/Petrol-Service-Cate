import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FamilleDetailsComponent } from './famille-details.component';

describe('FamilleDetailsComponent', () => {
  let component: FamilleDetailsComponent;
  let fixture: ComponentFixture<FamilleDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
