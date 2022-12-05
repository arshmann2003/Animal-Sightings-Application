import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PidDBComponent } from './pid-db.component';

describe('PidDBComponent', () => {
  let component: PidDBComponent;
  let fixture: ComponentFixture<PidDBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PidDBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PidDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
