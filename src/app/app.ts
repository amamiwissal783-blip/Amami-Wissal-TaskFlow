import { Component, inject, signal } from '@angular/core';

import { ViewToggle } from './shared/components/view-toggle/view-toggle';
import { ProjectList } from './features/projects/components/project-list/project-list';
import { UserList } from './features/users/components/user-list/user-list';
import { Header } from './shared/components/header/header';
import { RecentProjectsSidebar } from './shared/components/recent-projects-sidebar/recent-projects-sidebar';
import { ThemeService } from './core/services/theme';
import {
  Notification
} from './shared/components/notification/notification';
@Component({
  selector: 'app-root',
  imports: [
    ViewToggle,
    Header,
    Notification,
    RecentProjectsSidebar,
    ProjectList,
    UserList
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  themeService = inject(ThemeService);

  currentView = signal<'tasks' | 'users'>('tasks');

  changeView(view: 'tasks' | 'users'): void {
    this.currentView.set(view);
  }
}
