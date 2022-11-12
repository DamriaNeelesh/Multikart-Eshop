import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevisComponent } from './levis.component';

describe('LevisComponent', () => {
  let component: LevisComponent;
  let fixture: ComponentFixture<LevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
