import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategorieListComponent } from './categorie-list.component';

describe('CategorieListComponent', () => {
  let component: CategorieListComponent;
  let fixture: ComponentFixture<CategorieListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorieListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
