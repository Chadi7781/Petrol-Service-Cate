import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FournisseurListComponent } from './fournisseur-list.component';

describe('FournisseurListComponent', () => {
  let component: FournisseurListComponent;
  let fixture: ComponentFixture<FournisseurListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FournisseurListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FournisseurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
