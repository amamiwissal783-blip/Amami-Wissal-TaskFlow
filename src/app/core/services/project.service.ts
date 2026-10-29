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
  throwError,
  map
} from 'rxjs';

import {
  Project
} from '../../features/projects/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  readonly id = Math.random();

  private http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:3000/projects';

  loading = signal<boolean>(false);

  error = signal<string | null>(null);

  constructor() {
    console.log(
      'ProjectService créé - ID :',
      this.id
    );
  }

  getProjects(): Observable<Project[]> {

  this.loading.set(true);
  this.error.set(null);

  return this.http
    .get<Project[]>(this.apiUrl)
    .pipe(

      map(projects =>
        projects.map(project => ({
          ...project,

          id: Number(project.id),

          tasks: project.tasks.map(task => ({
            ...task,

            id: Number(task.id),

            assigneeId:
              task.assigneeId !== undefined
                ? Number(task.assigneeId)
                : undefined
          }))
        }))
      ),

      catchError(error => {

        this.error.set(
          'Impossible de charger les projets.'
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
  deleteProject(
    projectId: number
  ): Observable<void> {

    this.loading.set(true);
    this.error.set(null);

    return this.http
      .delete<void>(
        `${this.apiUrl}/${projectId}`
      )
      .pipe(

        catchError(error => {

          this.error.set(
            'Impossible de supprimer le projet.'
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
}
