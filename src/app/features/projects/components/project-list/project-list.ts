import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  Project
} from '../../models/project.model';

import {
  User
} from '../../../users/models/user.model';

import {
  ProjectService
} from '../../../../core/services/project.service';

import {
  UserService
} from '../../../../core/services/user.service';

import {
  TaskStatusChange
} from '../../models/task-status-change.model';

import {
  TaskDelete
} from '../../models/task-delete.model';

import {
  ProjectCard
} from '../project-card/project-card';

@Component({
  selector: 'app-project-list',

  imports: [
    ProjectCard,
    FormsModule
  ],

  templateUrl: './project-list.html',
  styleUrl: './project-list.css'
})
export class ProjectList {

  private projectService =
    inject(ProjectService);

  private userService =
    inject(UserService);

  projects =
    signal<Project[]>([]);

  users =
    signal<User[]>([]);

  searchTerm =
    signal('');

  loading =
    this.projectService.loading;

  error =
    this.projectService.error;

  filteredProjects =
    computed(() => {

      const term =
        this.searchTerm()
          .trim()
          .toLowerCase();

      if (!term) {
        return this.projects();
      }

      return this.projects()
        .filter(project =>
          project.name
            .toLowerCase()
            .includes(term)
        );

    });

  completedTasksByProject =
    computed(() => {

      const result:
        Record<number, number>
        = {};

      for (
        const project
        of this.projects()
      ) {

        result[project.id] =
          project.tasks
            .filter(
              task =>
                task.status === 'Terminé'
            )
            .length;

      }

      return result;

    });

  constructor() {

    console.log(
      'ProjectList - ProjectService ID :',
      this.projectService.id
    );

    this.projectService
      .getProjects()
      .subscribe({

        next: projects => {
          this.projects.set(projects);
        }

      });

    this.userService
      .getUsers()
      .subscribe({

        next: users => {
          this.users.set(users);
        }

      });

  }

  onTaskStatusChange(
    event: TaskStatusChange
  ): void {

    if (
      event.projectId === undefined
    ) {
      return;
    }

    this.projects.update(
      projects =>

        projects.map(
          project => {

            if (
              project.id !== event.projectId
            ) {
              return project;
            }

            return {

              ...project,

              tasks:
                project.tasks.map(
                  task => {

                    if (
                      task.id !== event.taskId
                    ) {
                      return task;
                    }

                    return {
                      ...task,
                      status: event.status
                    };

                  }
                )

            };

          }
        )

    );

  }

  onTaskDelete(
    event: TaskDelete
  ): void {

    if (
      event.projectId === undefined
    ) {
      return;
    }

    this.projects.update(
      projects =>

        projects.map(
          project => {

            if (
              project.id !== event.projectId
            ) {
              return project;
            }

            return {

              ...project,

              tasks:
                project.tasks.filter(
                  task =>
                    task.id !== event.taskId
                )

            };

          }
        )

    );

  }

  deleteProject(
    projectId: number
  ): void {

    this.projectService
      .deleteProject(projectId)
      .subscribe({

        next: () => {

          this.projects.update(
            projects =>
              projects.filter(
                project =>
                  project.id !== projectId
              )
          );

        }

      });

  }

  onProjectSelected(
    project: Project
  ): void {

    console.log(
      'Projet sélectionné :',
      project
    );

  }
}
