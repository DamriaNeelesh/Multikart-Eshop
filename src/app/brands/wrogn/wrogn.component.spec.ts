import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrognComponent } from './wrogn.component';

describe('WrognComponent', () => {
  let component: WrognComponent;
  let fixture: ComponentFixture<WrognComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrognComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrognComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
