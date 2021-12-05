import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateCategorieComponent } from './update-categorie.component';

describe('UpdateCategorieComponent', () => {
  let component: UpdateCategorieComponent;
  let fixture: ComponentFixture<UpdateCategorieComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
