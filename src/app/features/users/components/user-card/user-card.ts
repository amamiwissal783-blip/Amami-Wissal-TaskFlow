import { Component, computed, input } from '@angular/core';

import { User } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';

import { LowerCasePipe, TitleCasePipe, NgClass, NgStyle } from '@angular/common';

import { InitialsPipe } from '../../../../shared/pipes/initials.pipe';

import { UserProjectGroup } from '../user-project-group/user-project-group';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

import { HoverScaleDirective } from '../../../../shared/directives/hover-scale.directive';
@Component({
  selector: 'app-user-card',

  imports: [
    UserProjectGroup,
    HoverScaleDirective,
    EmptyState,
    TitleCasePipe,
    LowerCasePipe,
    InitialsPipe,
    NgClass,
    NgStyle
  ],

  templateUrl: './user-card.html',
  styleUrl: './user-card.css'
})
export class UserCard {

  user = input.required<User>();
  projects = input.required<Project[]>();

  roleColors: Record<string, string> = {
    'Développeur': '#3b82f6',
    'Designer': '#a855f7',
    'Chef de projet': '#f59e0b',
    'Testeur': '#22c55e'
  };

  get avatarColor(): string {
    return this.roleColors[this.user().role] ?? '#6b7280';
  }

  assignedTasks = computed(() => {

    return this.projects().flatMap(project =>
      project.tasks.filter(
        task => task.assigneeId === this.user().id
      )
    );

  });


  pendingCount = computed(() => {

    return this.assignedTasks().filter(
      task => task.status === 'En attente'
    ).length;

  });


  inProgressCount = computed(() => {

    return this.assignedTasks().filter(
      task => task.status === 'En cours'
    ).length;

  });


  completedCount = computed(() => {

    return this.assignedTasks().filter(
      task => task.status === 'Terminé'
    ).length;

  });


  projectsWithTasks = computed(() => {

    return this.projects()

      .map(project => ({

        project: project,

        tasks: project.tasks.filter(
          task => task.assigneeId === this.user().id
        )

      }))

      .filter(group =>
        group.tasks.length > 0
      );

  });

}
