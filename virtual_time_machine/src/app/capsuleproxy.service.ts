import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CapsuleproxyService {

  hostUrl:string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401 && error.error && error.error.redirectUrl) {
      // Redirect to the provided URL
      window.location.href = error.error.redirectUrl;
      return throwError('User is not authenticated. Redirecting to login.');
    } else {
      // Handle other errors
      return throwError('An error occurred: ' + error.message);
    }
  }

  getCapsuleList() {
    return this.httpClient.get<any[]>( this.hostUrl + 'capsuleList', { withCredentials: true})
    .pipe(
      catchError(this.handleError)
    );
  }

  getCapsule(capsuleID: string) {
    return this.httpClient.get<any>(this.hostUrl + `capsuleList/${capsuleID}`, { withCredentials: true})
    .pipe(
      catchError(this.handleError)
    );
  }

  createCapsule(formData: FormData) {
    return this.httpClient.post<any>(this.hostUrl + 'capsuleList', formData, { responseType: 'text' as 'json', withCredentials: true})
    .pipe(
      catchError(this.handleError)
    );
  }

  updateCapsule(capsuleID: string, updateData: any) {
    return this.httpClient.put(this.hostUrl + `capsuleList/${capsuleID}`, updateData, {withCredentials: true})
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteCapsule(capsuleID: string) {
    return this.httpClient.delete(this.hostUrl + `capsuleList/${capsuleID}`, {withCredentials: true})
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteFile(fileID: string): Observable<any> {
    return this.httpClient.delete<any>(this.hostUrl + `files/${fileID}`, { withCredentials: true })
    .pipe(
      catchError(this.handleError)
    );
  }

  addFilesToCapsule(capsuleID: string, formData: FormData): Observable<any> {
    return this.httpClient.post<any>(this.hostUrl + `capsuleList/${capsuleID}/files`, formData, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }
}
