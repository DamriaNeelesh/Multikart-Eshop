import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantabilComponent } from './cantabil.component';

describe('CantabilComponent', () => {
  let component: CantabilComponent;
  let fixture: ComponentFixture<CantabilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CantabilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CantabilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
