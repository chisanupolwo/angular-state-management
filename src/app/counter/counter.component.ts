import { Component, Signal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'nx-angular-new-counter',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  showCount = signal(false);
  count = signal(0);
  title = 'Counter'
  doubleCount = computed(() => this.count() * 2);
  conditionalCount = computed(() => this.showCount() ? `The count is ${this.count()}.` : 'Nothing to see here!');

  addCount(): void {
    this.count.update(value => value + 1)
  }
  
  triggerCount(): void {
    this.showCount.update(value => !value);
    // this.doubleCount.update(value => value + 2);
  }
}
