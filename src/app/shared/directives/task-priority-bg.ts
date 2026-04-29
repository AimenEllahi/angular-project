import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { TaskPriority } from '../../core/services/task';

@Directive({
  selector: '[appTaskPriorityBg]',
  standalone: true,
})
export class TaskPriorityBg implements OnChanges {
  @Input() appTaskPriorityBg: TaskPriority = 'Medium';

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  ngOnChanges(): void {
    const colorMap: Record<TaskPriority, string> = {
      High: 'rgba(244, 63, 94, 0.35)',
      Medium: 'rgba(245, 158, 11, 0.35)',
      Low: 'rgba(16, 185, 129, 0.35)',
    };
    this.renderer.setStyle(this.el.nativeElement, 'borderLeft', `3px solid ${colorMap[this.appTaskPriorityBg]}`);
  }
}
