import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxeListComponent } from './taxe-list.component';

describe('TaxeListComponent', () => {
  let component: TaxeListComponent;
  let fixture: ComponentFixture<TaxeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
