import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DrawingService {
  private readonly baseApiUrl = 'https://localhost:7004/api/drawing';
  private readonly uploadApiUrl = 'https://localhost:7004/api/upload';

  constructor(private http: HttpClient) {}

  // פונקציה לשליפת כל הציורים
  getAllDrawings(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}`);
  }

  async uploadDrawingFile(file: File): Promise<string> {
    const fileName = encodeURIComponent(file.name);

    // 1. בקשה ל-URL חתום
    const presignedUrlData: any = await firstValueFrom(
      this.http.get(`${this.uploadApiUrl}/presigned-url`, {
        params: new HttpParams().set('fileName', fileName),
      })
    );

    // 2. שליחת הקובץ ל-S3 דרך URL החתום
    await fetch(presignedUrlData.url, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    return fileName;
  }

  addDrawing(data: any): Observable<any> {
    return this.http.post(`${this.baseApiUrl}`, data);
  }

  updateDrawing(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/${id}`, data).pipe(
      tap((response) => {
        console.log('✅ Update successful:', response);
      }),
      catchError((error) => {
        console.error('❌ Update failed:', error);
        return throwError(() => error);
      })
    );
  }

  deleteDrawing(drawingId: number, fileName: string): Observable<any> {
    return new Observable((observer) => {
  
      // 1. מחיקת הקובץ מה-S3
      this.http.delete(`${this.uploadApiUrl}/${fileName}`).subscribe({
        next: () => {
  
          // 2. מחיקת הציור מהדאטהבייס
          this.http.delete(`${this.baseApiUrl}/${drawingId}`).subscribe({
            next: (res) => {
              observer.next(res);
              observer.complete();
            },
            error: (err) => {
              observer.error(err);
            },
          });
        },
        error: (err) => {
          console.error(`❌ שגיאה במחיקת הקובץ מה-S3:`, err);
          observer.error(err);
        },
      });
    });
  }
  
}
