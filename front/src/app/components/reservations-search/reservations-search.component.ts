import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reservations-search',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './reservations-search.component.html',
  styleUrl: './reservations-search.component.scss'
})
export class ReservationsSearchComponent {
  searchValue = '';

  @Output() search = new EventEmitter<string>();

  onInputChange() {
    this.search.emit(this.searchValue.trim().toLowerCase())
  }

  clear() {
    this.searchValue = '';
    this.search.emit('');
  }
}
