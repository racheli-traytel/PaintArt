// drawing-management.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DrawingService } from '../../services/drawings.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Drawing } from '../../models/Drawing';
import { EditDrawingDialogComponent } from '../edit-drawing-dialog/edit-drawing-dialog.component';


@Component({
  selector: 'app-drawing-management',
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
    MatDialogModule
  ],
  templateUrl: './drawing-management.component.html',
  styleUrls: ['./drawing-management.component.scss']
})
export class DrawingManagementComponent implements OnInit {
  drawings: Drawing[] = [];
  filteredDrawings: Drawing[] = [];
  searchText: string = '';
  loading: boolean = true;

  constructor(
    private drawingService: DrawingService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDrawings();  // טוען את הציורים מה-API
  }

  loadDrawings(): void {
    this.loading = true;
    this.drawingService.getAllDrawings().subscribe({
      next: (data) => {
        this.drawings = data;  // מאחסן את הציורים שהתקבלו
        this.filteredDrawings = [...this.drawings];  // מעדכן את הציורים המוצגים
        this.loading = false;  // מסיים את מצב הטעינה
      },
      error: (err) => {
        this.loading = false;  // אם יש שגיאה, מפסיקים את מצב הטעינה
        this.snackBar.open('Failed to load drawings.', 'Close', { duration: 3000 });
      }
    });
  }

  filterDrawings(): void {
    if (!this.searchText) {
      this.filteredDrawings = [...this.drawings];
      return;
    }
    
    const searchLower = this.searchText.toLowerCase();
    this.filteredDrawings = this.drawings.filter(drawing => 
      drawing.title.toLowerCase().includes(searchLower) || 
      drawing.description.toLowerCase().includes(searchLower)
    );
  }

  // openAddDrawingDialog method removed

  openEditDrawingDialog(drawing: Drawing): void {
    const dialogRef = this.dialog.open(EditDrawingDialogComponent, {
      width: '600px',
      data: { 
        isEdit: true,
        drawing: { ...drawing }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateDrawing(drawing.id, result);
      }
    });
  }

  confirmDeleteDrawing(drawing: Drawing): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Drawing',
        message: `Are you sure you want to delete "${drawing.title}"? This action cannot be undone.`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDrawing(drawing);
      }
    });
  }

  // addDrawing method removed

  updateDrawing(id: number, drawingData: any): void {
    this.loading = true;
    setTimeout(() => {
      const index = this.drawings.findIndex(d => d.id === id);
      if (index !== -1) {
        this.drawings[index] = { ...this.drawings[index], ...drawingData };
        this.filterDrawings();
      }
      this.loading = false;
      this.snackBar.open('Drawing updated successfully!', 'Close', {
        duration: 3000,
        panelClass: 'success-snackbar'
      });
    }, 1000);
  }

  deleteDrawing(drawing: Drawing): void {
    this.loading = true;
    
    this.drawingService.deleteDrawing(drawing.id, drawing.name).subscribe({
      next: () => {
        // מסנן את הציור ומסיר אותו מהמערך
        this.drawings = this.drawings.filter(d => d.id !== drawing.id);
        this.filterDrawings();
        this.loading = false;
        this.snackBar.open('Drawing deleted successfully!', 'Close', {
          duration: 3000,
          panelClass: 'success-snackbar'
        });
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open('Failed to delete drawing.', 'Close', { duration: 3000 });
      }
    });
  }

  getImagePlaceholder(drawing: Drawing): string {
    return '/api/placeholder/400/300';  // תמונת placeholder במקרה ואין תמונה אמיתית
  }
}