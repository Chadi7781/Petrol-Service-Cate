import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateMagasinComponent } from './create-magasin.component';

describe('CreateMagasinComponent', () => {
  let component: CreateMagasinComponent;
  let fixture: ComponentFixture<CreateMagasinComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMagasinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
