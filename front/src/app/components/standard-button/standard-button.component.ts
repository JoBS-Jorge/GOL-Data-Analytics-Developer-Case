import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-standard-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './standard-button.component.html',
  styleUrl: './standard-button.component.scss'
})
export class StandardButtonComponent {
  @Input() color: string = 'primary';
  @Input() outlined: boolean = false;
  @Input() disabled: boolean = false;  // Define se o botão está desabilitado
  @Input() type: 'button' | 'submit' | 'reset' = 'button';  // Define o tipo de botão
  @Input() label: string = '';  // Texto que será exibido no botão
  @Input() icon?: string = ''; // Ícone que ficara junto com o texto

  @Output() onClick = new EventEmitter<void>();  // Evento de clique do botão

  handleClick() {
    if (!this.disabled) {
      this.onClick.emit();  // Emite o evento de clique quando o botão não está desabilitado
    }
  }
}
