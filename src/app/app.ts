import { Component, signal } from '@angular/core';

import { ViewToggle } from './shared/components/view-toggle/view-toggle';
import { ProjectList } from './features/projects/components/project-list/project-list';
import { UserList } from './features/users/components/user-list/user-list';

@Component({
  selector: 'app-root',
  imports: [
    ViewToggle,
    ProjectList,
    UserList
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  currentView = signal<'tasks' | 'users'>('tasks');

  changeView(view: 'tasks' | 'users'): void {
    this.currentView.set(view);
  }
}
