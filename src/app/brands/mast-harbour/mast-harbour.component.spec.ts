import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastHarbourComponent } from './mast-harbour.component';

describe('MastHarbourComponent', () => {
  let component: MastHarbourComponent;
  let fixture: ComponentFixture<MastHarbourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MastHarbourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MastHarbourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
