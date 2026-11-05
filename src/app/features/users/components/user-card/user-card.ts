import {
  Component,
  computed,
  inject,
  input
} from '@angular/core';

import {
  LowerCasePipe,
  NgClass,
  NgStyle,
  TitleCasePipe
} from '@angular/common';

import {
  User
} from '../../models/user.model';

import {
  Project
} from '../../../projects/models/project.model';

import {
  InitialsPipe
} from '../../../../shared/pipes/initials.pipe';

import {
  EmptyState
} from '../../../../shared/components/empty-state/empty-state';

import {
  UserProjectGroup
} from '../user-project-group/user-project-group';

import {
  HoverScaleDirective
} from '../../../../shared/directives/hover-scale.directive';

import {
  ThemeService
} from '../../../../core/services/theme';

@Component({
  selector: 'app-user-card',

  imports: [
    LowerCasePipe,
    TitleCasePipe,
    NgClass,
    NgStyle,
    InitialsPipe,
    EmptyState,
    UserProjectGroup,
    HoverScaleDirective
  ],

  templateUrl: './user-card.html',
  styleUrl: './user-card.css'
})
export class UserCard {

  user =
    input.required<User>();

  projects =
    input.required<Project[]>();

  themeService =
    inject(ThemeService);

  avatarColor =
    '#3b82f6';

  projectsWithTasks =
    computed(() => {

      return this.projects()
        .map(project => {

          const tasks =
            project.tasks.filter(
              task =>
                Number(task.assigneeId) ===
                Number(this.user().id)
            );

          return {
            project,
            tasks
          };

        })
        .filter(
          group =>
            group.tasks.length > 0
        );

    });

  allUserTasks =
    computed(() => {

      return this.projectsWithTasks()
        .flatMap(
          group =>
            group.tasks
        );

    });

  pendingCount =
    computed(() =>

      this.allUserTasks()
        .filter(
          task =>
            task.status ===
            'En attente'
        )
        .length

    );

  inProgressCount =
    computed(() =>

      this.allUserTasks()
        .filter(
          task =>
            task.status ===
            'En cours'
        )
        .length

    );

  completedCount =
    computed(() =>

      this.allUserTasks()
        .filter(
          task =>
            task.status ===
            'Terminé'
        )
        .length

    );

}
