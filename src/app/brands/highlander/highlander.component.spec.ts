import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlanderComponent } from './highlander.component';

describe('HighlanderComponent', () => {
  let component: HighlanderComponent;
  let fixture: ComponentFixture<HighlanderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighlanderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighlanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
