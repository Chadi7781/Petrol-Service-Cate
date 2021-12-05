import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommandeListComponent } from './commande-list.component';

describe('CommandeListComponent', () => {
  let component: CommandeListComponent;
  let fixture: ComponentFixture<CommandeListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
