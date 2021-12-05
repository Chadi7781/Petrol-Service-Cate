import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateMagasinComponent } from './update-magasin.component';

describe('UpdateMagasinComponent', () => {
  let component: UpdateMagasinComponent;
  let fixture: ComponentFixture<UpdateMagasinComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMagasinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
