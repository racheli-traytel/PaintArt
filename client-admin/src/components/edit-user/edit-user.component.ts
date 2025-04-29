import { Component, Inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../models/user';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [MatDialogModule,
    ReactiveFormsModule,MatFormFieldModule,MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,MatError],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  editUserForm!: FormGroup;

  constructor
  (
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserComponent>,
    private UserService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: { user: User } // מקבל את הקורס שנבחר לעדכון
  ) {
    
    this.editUserForm = this.fb.group({
        usereGroup: this.fb.group({
          firstName: [this.data.user.firstName, Validators.required],
          lastName: [this.data.user.lastName, Validators.required],
          email: [this.data.user.email, Validators.compose([Validators.required, Validators.email])],
        }),
        password: [this.data.user.password, Validators.required],  // הוסף את ה-password כאן
      });
  }

  onNoClick(): void {
   this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.editUserForm.value);
    console.log("id:" + this.data.user.id);
  
    if (this.editUserForm.valid) {
      const updatedUser = {
        firstName: this.editUserForm.value.usereGroup.firstName,
        lastName: this.editUserForm.value.usereGroup.lastName,
        email: this.editUserForm.value.usereGroup.email,
        password: this.editUserForm.value.password
      };
      this.UserService.updateUser(this.data.user.id, updatedUser).subscribe({
        next: (response) => {
          console.log('User updated successfully:', response);
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error updating user:', err);
          alert('Failed to update user');
        }
      });
    }
  }
}
