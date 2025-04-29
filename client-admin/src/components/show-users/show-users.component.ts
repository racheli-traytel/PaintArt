import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../services/users.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { User } from '../../models/user';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-show-users',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './show-users.component.html',
  styleUrl: './show-users.component.css'
})
export class ShowUsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchText: string = '';
  
  constructor(
    private dialog: MatDialog,
    private userService: UsersService
  ) {}
  
  ngOnInit(): void {
    this.getUsers();
  }
  
  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = [...this.users];
        console.log('Users loaded:', this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
  
  filterUsers(): void {
    const search = this.searchText.toLowerCase().trim();
   
    if (!search) {
      this.filteredUsers = [...this.users];
      return;
    }
   
    this.filteredUsers = this.users.filter(user =>
      user.email.toLowerCase().includes(search) ||
      user.firstName.toLowerCase().includes(search) ||
      user.lastName.toLowerCase().includes(search)
    );
  }
  
  confirmDelete(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(user.id);
      }
    });
  }
  
  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        console.log('User deleted successfully');
        this.users = this.users.filter(user => user.id !== id);
        this.filterUsers(); // Refresh filtered list
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      }
    });
  }
  
  editUser(user: User): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '500px',
      data: { user }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User was updated successfully!');
        this.getUsers();
      }
    });
  }
  
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '500px',
      disableClose: false
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User was added successfully!');
        this.getUsers(); // Refresh the user list
      }
    });
  }
}