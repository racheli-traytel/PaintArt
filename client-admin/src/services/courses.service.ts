import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/Cours';

@Injectable({
  providedIn: 'root'
})

export class CoursesService {
  private apiUrl = 'http://localhost:3000/api/courses'; 
  constructor(private http: HttpClient) {}
  
  getCourses(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addCourse(title: string, description: string): Observable<any> 
  {
    const userId = sessionStorage.getItem('userId');
    const teacherId: number = userId ? +userId : 0; 
    console.log(teacherId);
    const body = { title, description,teacherId };

    return this.http.post<any>(this.apiUrl, body,);
  }
  getCourseById(id: string): Observable<Course> {

    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }
 // פונקציה לעדכון קורס לפי ID
 updateCourse(id: string, updates: any): Observable<any> {

  return this.http.put(`${this.apiUrl}/${id}`, updates)
}

// פונקציה למחיקת קורס לפי ID
deleteCourse(id: string): Observable<any> {

  return this.http.delete(`${this.apiUrl}/${id}`);
}

  // הוספת סטודנט לקורס
  enrollStudent(courseId: string, userId: string): Observable<any> {

   return this.http.post(`${this.apiUrl}/${courseId}/enroll`,{userId});
  }


  // הסרת סטודנט מקורס
  unenrollStudent(courseId: string, userId: string): Observable<any> {

    return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`,{
      body: { userId }});
  }

  // שליפת כל הקורסים של סטודנט מסוים
  getStudentCourses(studentId: string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/student/${studentId}`);
  }
}

