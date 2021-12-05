import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateFournisseurComponent } from './update-fournisseur.component';

describe('UpdateFournisseurComponent', () => {
  let component: UpdateFournisseurComponent;
  let fixture: ComponentFixture<UpdateFournisseurComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
