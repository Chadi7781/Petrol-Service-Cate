import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateCategorieComponent } from './create-categorie.component';

describe('CreateCategorieComponent', () => {
  let component: CreateCategorieComponent;
  let fixture: ComponentFixture<CreateCategorieComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
