import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDrawingDialogComponent } from './edit-drawing-dialog.component';

describe('AddEditDrawingDialogComponent', () => {
  let component: AddEditDrawingDialogComponent;
  let fixture: ComponentFixture<AddEditDrawingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDrawingDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDrawingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
