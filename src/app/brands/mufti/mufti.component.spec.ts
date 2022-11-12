import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuftiComponent } from './mufti.component';

describe('MuftiComponent', () => {
  let component: MuftiComponent;
  let fixture: ComponentFixture<MuftiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuftiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuftiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
