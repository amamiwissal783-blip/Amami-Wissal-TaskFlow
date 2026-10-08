import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Project } from '../../models/project.model';
import { ProjectCard } from '../project-card/project-card';
import { PROJECTS } from '../../data/projects.data';

import { inject } from '@angular/core';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
  selector: 'app-project-list',
  imports: [ProjectCard, FormsModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {

  private projectService = inject(ProjectService);

  projects = signal<Project[]>([]);


  searchTerm = signal('');

  filteredProjects = computed(() => {
    const term = this.searchTerm().toLowerCase();

    return this.projects().filter(project =>
      project.name.toLowerCase().includes(term)
    );
  });

  constructor() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects.set(projects);
    });
  }

  resetProjects(): void {
    this.projects.set(PROJECTS);
  }

  clearProjects(): void {
    this.projects.set([]);
  }

  removeLastProject(): void {
    this.projects.update(projects =>
      projects.slice(0, -1)
    );
  }

  onProjectSelected(project: Project): void {
    console.log('Projet sélectionné :', project);
  }
}


