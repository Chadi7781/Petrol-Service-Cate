import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateSousFamilleComponent } from './create-sousFamille.component';

describe('CreateSousFamilleComponent', () => {
  let component: CreateSousFamilleComponent;
  let fixture: ComponentFixture<CreateSousFamilleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSousFamilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSousFamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
