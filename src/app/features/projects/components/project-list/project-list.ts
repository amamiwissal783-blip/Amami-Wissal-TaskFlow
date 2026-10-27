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


import {
  PROJECTS
} from '../../data/projects.data';


@Component({

  selector: 'app-project-list',

  imports: [
    ProjectCard,
    FormsModule
  ],

  templateUrl:
    './project-list.html',

  styleUrl:
    './project-list.css'

})
export class ProjectList {


  private projectService =
    inject(ProjectService);


  private userService =
    inject(UserService);


  /*
   * SIGNALS
   */

  projects =
    signal<Project[]>([]);


  users =
    signal<User[]>([]);


  searchTerm =
    signal('');


  /*
   * Recherche
   */

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


  /*
   * Nombre de tâches terminées
   */

  completedTasksByProject =
    computed(() => {

      const result:
        Record<number, number>
        = {};


      for (
        const project
        of this.projects()
      ) {

        result[
          project.id
        ] =

          project.tasks
            .filter(
              task =>
                task.status
                === 'Terminé'
            )
            .length;

      }


      return result;

    });


  /*
   * RxJS
   */

  constructor() {

    this.projectService
      .getProjects()
      .subscribe(projects => {

        this.projects.set(
          projects
        );

      });


    this.userService
      .getUsers()
      .subscribe(users => {

        this.users.set(
          users
        );

      });

  }


  /*
   * Modification statut
   */

  onTaskStatusChange(
    event: TaskStatusChange
  ): void {


    if (
      event.projectId
      === undefined
    ) {

      return;

    }


    this.projects.update(
      projects =>

        projects.map(
          project => {


            // Projet non concerné

            if (
              project.id
              !== event.projectId
            ) {

              return project;

            }


            // Nouveau projet

            return {

              ...project,


              tasks:
                project.tasks.map(
                  task => {


                    // Tâche non concernée

                    if (
                      task.id
                      !== event.taskId
                    ) {

                      return task;

                    }


                    // Nouvelle tâche

                    return {

                      ...task,

                      status:
                        event.status

                    };

                  }
                )

            };

          }
        )

    );

  }


  /*
   * BONUS :
   * suppression tâche
   */

  onTaskDelete(
    event: TaskDelete
  ): void {


    if (
      event.projectId
      === undefined
    ) {

      return;

    }


    this.projects.update(
      projects =>

        projects.map(
          project => {


            if (
              project.id
              !== event.projectId
            ) {

              return project;

            }


            return {

              ...project,


              tasks:

                project.tasks
                  .filter(
                    task =>
                      task.id
                      !== event.taskId
                  )

            };

          }
        )

    );

  }


  /*
   * Fonctions déjà présentes
   */

  resetProjects(): void {

    this.projects.set(

      PROJECTS.map(
        project => ({

          ...project,

          tasks:
            project.tasks.map(
              task => ({
                ...task
              })
            )

        })
      )

    );

  }


  clearProjects(): void {

    this.projects.set([]);

  }


  removeLastProject(): void {

    this.projects.update(
      projects =>
        projects.slice(
          0,
          -1
        )
    );

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
