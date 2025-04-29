import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DrawingService } from '../../services/drawings.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, NgClass } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-drawing-dialog',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    DatePipe,
    MatDialogModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './edit-drawing-dialog.component.html',
  styleUrl: './edit-drawing-dialog.component.scss'
})
export class EditDrawingDialogComponent implements OnInit {
  drawingForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  loading: boolean = false;
  originalName: string = '';
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditDrawingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private drawingService: DrawingService
  ) {
    // Store the original name
    this.originalName = data.drawing ? data.drawing.name : '';
    
    this.drawingForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      imageUrl: ['']
    });

    if (data.drawing) {
      this.drawingForm.patchValue({
        title: data.drawing.title,
        description: data.drawing.description,
        imageUrl: data.drawing.imageUrl
      });
      this.imagePreview = data.drawing.imageUrl;
    }
  }

  ngOnInit(): void {
    // Initialize any additional data if needed
  }

  async onSubmit(): Promise<void> {
    if (this.drawingForm.invalid) {
      return;
    }
  
    this.loading = true;
  
    try {
      const drawingData = {
        ...this.drawingForm.value,
        category: this.data.drawing.category,
        name: this.originalName // Use the original name, can't be changed
      };
  
      // Call the update function from service
      this.drawingService.updateDrawing(this.data.drawing.id, drawingData).subscribe({
        next: (res) => {
          console.log('✅ Drawing updated successfully:', res);
          this.dialogRef.close(drawingData); // Return result to the calling component
        },
        error: (err) => {
          console.error('❌ Failed to update drawing:', err);
          alert('אירעה שגיאה בעת עדכון הציור. נסה שוב.');
          this.loading = false;
        }
      });
    } catch (error) {
      console.error('❌ Unexpected error during update:', error);
      alert('אירעה שגיאה בלתי צפויה.');
      this.loading = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}