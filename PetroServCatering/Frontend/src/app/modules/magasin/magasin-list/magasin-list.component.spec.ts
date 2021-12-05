import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MagasinListComponent } from './magasin-list.component';

describe('MagasinListComponent', () => {
  let component: MagasinListComponent;
  let fixture: ComponentFixture<MagasinListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MagasinListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagasinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
