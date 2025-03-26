import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorsComponent } from '../errors/errors.component';
import { MatError,  } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,ErrorsComponent, ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,MatIconModule,
    MatCardModule,  MatError],  // הוספת קומפוננטת השגיאה לקומפוננטה
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  addUserForm!: FormGroup;
  errormessage: string = '';  // משתנה לשמירת השגיאה
  showError: boolean = false;  // משתנה לניהול הצגת השגיאה

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      userGroup: this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.required],
      }),
    });
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      const {email,password} = this.addUserForm.value.userGroup;

      this.authservice.login(email, password).subscribe({
        next: (response) => {
          console.log('User logged in successfully', response);
          sessionStorage.setItem('token', response.token);
          console.log("id"+response.user.id);
          
      sessionStorage.setItem('userId', response.user.id);
          console.log("user",response);
          
          this.dialogRef.close();
          this.router.navigate(['/home']);
        },
        error: (err) => {
          // עדכון השגיאה
          if (err.status === 400)
          {
            this.errormessage = 'Invalid credentials';
          } else if (err.status === 401) {
            this.errormessage = 'only adnim can login';
          } else {
            console.log("err.status",err.status);
            
            this.errormessage = 'An unexpected error occurred';
          }
          this.showError = true;  // הצגת השגיאה
        }
      });
    } else {
      this.errormessage = 'Please fill in all fields correctly.';
      this.showError = true;
    }
    console.log( this.errormessage );
    
  }

  onErrorClosed() {
    this.showError = false;  // הסתרת השגיאה לאחר סגירתה
  }
}