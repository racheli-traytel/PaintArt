import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

   constructor(private http: HttpClient) { }
   private apiUrl= "https://localhost:7004/api/User"
   
     getUsers(): Observable<any> {
       return this.http.get<any>(this.apiUrl);
     }


      addUser(firstName:string, lastName:string,email:string,password:string): Observable<any> 
       {     
         return this.http.post<any>(this.apiUrl,{firstName,lastName,email,password});
       }
       getUserById(id: string): Observable<any> {
     
         return this.http.get<any>(`${this.apiUrl}/${id}`);
       }
      // פונקציה לעדכון קורס לפי ID
      updateUser(id: string, updates: any): Observable<any> {
     
       return this.http.put(`${this.apiUrl}/${id}`, updates)
     }
     
     // פונקציה למחיקת קורס לפי ID
     deleteUser(id: string): Observable<any> {
     
       return this.http.delete(`${this.apiUrl}/${id}`);
     }
     getUserGrowthData(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/growth`);
    }
}
