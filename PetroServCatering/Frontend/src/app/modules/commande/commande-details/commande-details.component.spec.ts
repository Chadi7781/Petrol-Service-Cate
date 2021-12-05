import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommandeDetailsComponent } from './commande-details.component';

describe('CommandeDetailsComponent', () => {
  let component: CommandeDetailsComponent;
  let fixture: ComponentFixture<CommandeDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
