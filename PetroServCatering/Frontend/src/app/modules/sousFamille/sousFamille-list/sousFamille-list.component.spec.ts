import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SousFamilleListComponent } from './sousFamille-list.component';

describe('SousFamilleListComponent', () => {
  let component: SousFamilleListComponent;
  let fixture: ComponentFixture<SousFamilleListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SousFamilleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SousFamilleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
