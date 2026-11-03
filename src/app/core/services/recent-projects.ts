import {
  Injectable,
  signal
} from '@angular/core';

import {
  Project
} from '../../features/projects/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class RecentProjectsService {

  recentProjects =
    signal<Project[]>([]);

  addProject(
    project: Project
  ): void {

    this.recentProjects.update(
      projects => {

        const filtered =
          projects.filter(
            item =>
              item.id !== project.id
          );

        return [
          project,
          ...filtered
        ].slice(0, 5);

      }
    );

  }

}
