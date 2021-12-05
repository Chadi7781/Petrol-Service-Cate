import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TypeArticleDetailsComponent } from './typeArticle-details.component';

describe('TypeArticleDetailsComponent', () => {
  let component: TypeArticleDetailsComponent;
  let fixture: ComponentFixture<TypeArticleDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeArticleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeArticleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
