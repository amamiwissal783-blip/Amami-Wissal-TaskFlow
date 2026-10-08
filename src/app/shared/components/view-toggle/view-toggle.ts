import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-view-toggle',
  templateUrl: './view-toggle.html',
})
export class ViewToggle {

  activeView = input<'tasks' | 'users'>('tasks');

  viewChange = output<'tasks' | 'users'>();

  setView(view: 'tasks' | 'users'): void {
    this.viewChange.emit(view);
  }
}
