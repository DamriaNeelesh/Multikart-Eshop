import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PajamasComponent } from './pajamas.component';

describe('PajamasComponent', () => {
  let component: PajamasComponent;
  let fixture: ComponentFixture<PajamasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PajamasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PajamasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
