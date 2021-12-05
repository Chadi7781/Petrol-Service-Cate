import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommandeValiderComponent } from './commande-valider.component';

describe('CommandeValiderComponent', () => {
  let component: CommandeValiderComponent;
  let fixture: ComponentFixture<CommandeValiderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandeValiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeValiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
