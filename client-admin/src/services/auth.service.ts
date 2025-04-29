import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7004/api/Auth';

  constructor(private http: HttpClient) { }
  
  register(firstName: string, lastName: string, email: string, password: string, roleName: string): Observable<any> {
    const user = { firstName, lastName, email, password, roleName };
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    // Return the HTTP observable directly to preserve the error information
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}