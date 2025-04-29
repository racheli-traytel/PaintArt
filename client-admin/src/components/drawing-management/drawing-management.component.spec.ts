import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingManagementComponent } from './drawing-management.component';

describe('DrawingManagementComponent', () => {
  let component: DrawingManagementComponent;
  let fixture: ComponentFixture<DrawingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
