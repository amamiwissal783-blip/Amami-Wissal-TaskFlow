import {
  Directive,
  HostBinding,
  Input,
  OnChanges
} from '@angular/core';

@Directive({
  selector: '[appOverdue]'
})
export class OverdueDirective implements OnChanges {

  @Input() dueDate?: string;

  @Input() done = false;

  @HostBinding('class')
  hostClasses = '';

  ngOnChanges(): void {

    this.hostClasses = '';

    if (!this.dueDate || this.done) {
      return;
    }

    const today = new Date();
    const deadline = new Date(this.dueDate);

    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    if (deadline < today) {
      this.hostClasses = 'border-red-500 bg-red-50';
    }
  }
}
