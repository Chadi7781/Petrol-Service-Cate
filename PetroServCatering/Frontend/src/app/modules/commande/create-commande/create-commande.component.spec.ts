import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateCommandeComponent } from './create-commande.component';

describe('CreateEmployeeComponent', () => {
  let component: CreateCommandeComponent;
  let fixture: ComponentFixture<CreateCommandeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
