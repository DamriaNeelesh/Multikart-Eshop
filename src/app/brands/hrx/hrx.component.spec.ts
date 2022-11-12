import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRXComponent } from './hrx.component';

describe('HRXComponent', () => {
  let component: HRXComponent;
  let fixture: ComponentFixture<HRXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRXComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HRXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
