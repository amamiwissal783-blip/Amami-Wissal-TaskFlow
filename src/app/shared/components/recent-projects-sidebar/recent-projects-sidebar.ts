import {
  Component,
  inject
} from '@angular/core';

import {
  RecentProjectsService
} from '../../../core/services/recent-projects';

@Component({
  selector: 'app-recent-projects-sidebar',
  imports: [],
  templateUrl: './recent-projects-sidebar.html',
  styleUrl: './recent-projects-sidebar.css'
})
export class RecentProjectsSidebar {

  recentProjectsService =
    inject(RecentProjectsService);

}
