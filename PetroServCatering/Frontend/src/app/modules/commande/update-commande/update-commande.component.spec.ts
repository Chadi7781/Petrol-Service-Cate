import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpdateCommandeComponent } from './update-commande.component';

describe('UpdateCommandeComponent', () => {
  let component: UpdateCommandeComponent;
  let fixture: ComponentFixture<UpdateCommandeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
