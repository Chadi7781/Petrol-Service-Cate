import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaxeComponent } from './update-taxe.component';

describe('UpdateTaxeComponent', () => {
  let component: UpdateTaxeComponent;
  let fixture: ComponentFixture<UpdateTaxeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTaxeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTaxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
