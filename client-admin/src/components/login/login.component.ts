import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorsComponent } from '../errors/errors.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../../services/auth.service';
import * as jwt from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorsComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  showError: boolean = false;
  hidePassword = true;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('User logged in successfully', response);
          // שמירת הטוקן והמידע לפי ההעדפות
          if (rememberMe) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.user.id);
          } else {
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('userId', response.user.id);
          }
          
          // פענוח הטוקן ושליפת ה־role
          const decodedToken: any = jwt.jwtDecode(response.token);
          const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          console.log('role:', role);
          
          // אם ה־role אינו "Admin", הצג הודעת שגיאה
          if (role !== 'Admin') {
            this.errorMessage = 'רק מנהל יכול להתחבר';
            this.showError = true;
          } else {
            // אם הכל בסדר, נווט לעמוד הבית
            this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          
          // טיפול בשגיאות מסוגים שונים
          if (err.status === 401) {
            // Unauthorized - שגיאת אימות
            this.errorMessage = err.error || 'אימות נכשל, אנא בדוק את הפרטים שהזנת';
          } else if (err.error && typeof err.error === 'string') {
            // שגיאה כמחרוזת ישירה
            this.errorMessage = err.error;
          } else if (err.error && err.error.message) {
            // שגיאה עם שדה message
            this.errorMessage = err.error.message;
          } else {
            // שגיאה כללית
            this.errorMessage = 'אירעה שגיאה בהתחברות, אנא נסה שוב מאוחר יותר';
          }
          
          this.showError = true;
        }
      });
    } else {
      this.errorMessage = 'נא למלא את כל השדות בצורה תקינה';
      this.showError = true;
    }
  }
 
  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}