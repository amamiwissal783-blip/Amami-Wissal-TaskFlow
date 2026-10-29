import {
  Injectable,
  inject,
  signal
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  catchError,
  finalize,
  map,
  throwError
} from 'rxjs';

import {
  User
} from '../../features/users/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly id = Math.random();

  private http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:3000/users';

  loading = signal<boolean>(false);

  error = signal<string | null>(null);

  constructor() {
    console.log(
      'UserService créé - ID :',
      this.id
    );
  }

  getUsers(): Observable<User[]> {

    this.loading.set(true);
    this.error.set(null);

    return this.http
      .get<User[]>(this.apiUrl)
      .pipe(

        map(users =>
          users.map(user => ({
            ...user,
            id: Number(user.id)
          }))
        ),

        catchError(error => {

          this.error.set(
            'Impossible de charger les utilisateurs.'
          );

          return throwError(
            () => error
          );

        }),

        finalize(() => {
          this.loading.set(false);
        })

      );
  }

  getUserById(
    id: number
  ): Observable<User> {

    return this.http
      .get<User>(
        `${this.apiUrl}/${id}`
      )
      .pipe(

        map(user => ({
          ...user,
          id: Number(user.id)
        }))

      );
  }
}
