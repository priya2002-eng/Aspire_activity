import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/users';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  signUp(userData: { name: string, email: string, password: string, mobile: string }): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${userData.email}`).pipe(
      map(users => {
        if (users.length > 0) {
          throw new Error('User already exists');
        } else {
          return this.http.post(this.apiUrl, userData).pipe(
            catchError((error: HttpErrorResponse) => {
              return throwError(this.handleError(error));
            })
          );
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(this.handleError(error));
      })
    );
  }

  signIn(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        map(users => {
          if (users.length > 0 && users[0].password === password) {
            this.currentUserSubject.next(users[0]);
            return users[0];
          } else {
            throw new Error('Invalid email or password');
          }
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(this.handleError(error));
        })
      );
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getUser(): Observable<any> {
    return this.currentUser;
  }

  private handleError(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return 'User already exists.';
  }

  getUserID(): number {
    return this.currentUserSubject.value ? this.currentUserSubject.value.id : null;
  }
}
