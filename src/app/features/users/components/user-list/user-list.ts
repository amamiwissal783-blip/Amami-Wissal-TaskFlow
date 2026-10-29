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
  User
} from '../../models/user.model';

import {
  Project
} from '../../../projects/models/project.model';

import {
  UserService
} from '../../../../core/services/user.service';

import {
  ProjectService
} from '../../../../core/services/project.service';

import {
  UserCard
} from '../user-card/user-card';

import {
  EmptyState
} from '../../../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-user-list',

  imports: [
    FormsModule,
    UserCard,
    EmptyState
  ],

  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList {

  private userService =
    inject(UserService);

  private projectService =
    inject(ProjectService);

  users =
    signal<User[]>([]);

  projects =
    signal<Project[]>([]);

  searchTerm =
    signal('');

  loading =
    this.userService.loading;

  error =
    this.userService.error;

  filteredUsers =
    computed(() => {

      const search =
        this.searchTerm()
          .trim()
          .toLowerCase();

      if (!search) {
        return this.users();
      }

      return this.users()
        .filter(user =>
          user.name
            .toLowerCase()
            .includes(search)
        );

    });

  constructor() {

    console.log(
      'UserList - ProjectService ID :',
      this.projectService.id
    );

    this.userService
      .getUsers()
      .subscribe({

        next: users => {
          this.users.set(users);
        }

      });

    this.projectService
      .getProjects()
      .subscribe({

        next: projects => {
          this.projects.set(projects);
        }

      });

  }
}
