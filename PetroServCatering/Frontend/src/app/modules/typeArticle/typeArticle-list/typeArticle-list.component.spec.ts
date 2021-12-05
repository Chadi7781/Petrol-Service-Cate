import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TypeArticleListComponent } from './typeArticle-list.component';

describe('TypeArticleListComponent', () => {
  let component: TypeArticleListComponent;
  let fixture: ComponentFixture<TypeArticleListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeArticleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
