import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-window',
  imports: [],
  templateUrl: './confirmation-window.component.html',
  styleUrl: './confirmation-window.component.scss'
})
export class ConfirmationWindowComponent {
  @Input() text!: string;
  @Output() action = new EventEmitter<void>();
  @Output() hideWindow = new EventEmitter<void>();
}
