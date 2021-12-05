import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategorieDetailsComponent } from './categorie-details.component';

describe('CategorieDetailsComponent', () => {
  let component: CategorieDetailsComponent;
  let fixture: ComponentFixture<CategorieDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorieDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
