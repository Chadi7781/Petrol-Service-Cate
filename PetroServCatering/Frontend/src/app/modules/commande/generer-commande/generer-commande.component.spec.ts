import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenererCommandeComponent } from './generer-commande.component';

describe('GenererCommandeComponent', () => {
  let component: GenererCommandeComponent;
  let fixture: ComponentFixture<GenererCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenererCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenererCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
