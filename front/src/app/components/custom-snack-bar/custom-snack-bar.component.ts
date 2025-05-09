import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


@Component({
  standalone: true,
  selector: 'app-custom-snack-bar',
  imports:[ CommonModule, MatIcon],
  templateUrl: './custom-snack-bar.component.html',
  styleUrls: ['./custom-snack-bar.component.scss']
})
export class CustomSnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string, type: 'success' | 'error' | 'warn' | 'info' }) {}

  getIcon(type: string): string {
    switch (type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      case 'warn': return 'warning';
      case 'info': return 'info';
      default: return 'info';
    }
  }
}
