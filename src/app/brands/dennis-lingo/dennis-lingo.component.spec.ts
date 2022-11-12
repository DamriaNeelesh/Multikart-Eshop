import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DennisLingoComponent } from './dennis-lingo.component';

describe('DennisLingoComponent', () => {
  let component: DennisLingoComponent;
  let fixture: ComponentFixture<DennisLingoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DennisLingoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DennisLingoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
