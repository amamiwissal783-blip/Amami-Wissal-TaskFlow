import { TestBed } from '@angular/core/testing';
import { RecentProjects } from './recent-projects';

describe('RecentProjects', () => {
  let service: RecentProjects;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentProjects);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
