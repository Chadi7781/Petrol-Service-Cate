import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateTypeArticleComponent } from './update-typeArticle.component';

describe('UpdateTypeArticleComponent', () => {
  let component: UpdateTypeArticleComponent;
  let fixture: ComponentFixture<UpdateTypeArticleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTypeArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTypeArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
