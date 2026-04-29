import { TaskPriorityBg } from './task-priority-bg';
import { ElementRef, Renderer2 } from '@angular/core';

describe('TaskPriorityBg', () => {
  it('should create an instance', () => {
    const mockEl = { nativeElement: document.createElement('div') } as ElementRef<HTMLElement>;
    const mockRenderer = ({ setStyle: () => undefined } as unknown) as Renderer2;
    const directive = new TaskPriorityBg(mockEl, mockRenderer);
    expect(directive).toBeTruthy();
  });
});
