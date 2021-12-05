import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SousFamilleDetailsComponent } from './sousFamille-details.component';

describe('SousFamilleDetailsComponent', () => {
  let component: SousFamilleDetailsComponent;
  let fixture: ComponentFixture<SousFamilleDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SousFamilleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SousFamilleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
