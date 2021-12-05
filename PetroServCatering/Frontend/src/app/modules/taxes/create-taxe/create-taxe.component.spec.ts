import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaxeComponent } from './create-taxe.component';

describe('CreateTaxeComponent', () => {
  let component: CreateTaxeComponent;
  let fixture: ComponentFixture<CreateTaxeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTaxeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
