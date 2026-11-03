import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentProjectsSidebar } from './recent-projects-sidebar';

describe('RecentProjectsSidebar', () => {
  let component: RecentProjectsSidebar;
  let fixture: ComponentFixture<RecentProjectsSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentProjectsSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentProjectsSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
