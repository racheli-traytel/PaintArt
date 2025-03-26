import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../models/user';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit{
  addUserForm!: FormGroup;

  constructor(public userservice: UsersService, private fb: FormBuilder,    private router: Router,public AuthService:AuthService
  ) {}

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      usereGroup: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.compose([Validators.required, Validators.email])],
      }),
      password: ['', Validators.required],  // הוסף את ה-password כאן
    });
  }

  onSubmit() {
    
    if (this.addUserForm.valid) {
      if (this.addUserForm.valid) {
        const userGroup = this.addUserForm.value.usereGroup;  // קבלת הערכים מקבוצת ה-usereGroup
        const password = this.addUserForm.value.password;     // קבלת הערך של password
    
        const { firstName, lastName, email } = userGroup;
    
    this.AuthService.register(firstName, lastName,email,password,"User").subscribe({
    next: (response) => {
      console.log(response);
      this.router.navigate(['/home/show-users']);

    },
    error: (err) => {
      console.error('Error adding user', err);
    }
  });

    }
  }
  }
}
