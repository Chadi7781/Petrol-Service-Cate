import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateTypeArticleComponent } from './create-typeArticle.component';

describe('CreateTypeArticleComponent', () => {
  let component: CreateTypeArticleComponent;
  let fixture: ComponentFixture<CreateTypeArticleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTypeArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTypeArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
