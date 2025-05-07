import { Component, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isHighContrast: boolean = false;

  ngOnInit() {
    // Recuperar o estado do contraste do localStorage ao carregar o componente
    const savedContrast = localStorage.getItem('highContrast');
    if (savedContrast) {
      this.isHighContrast = JSON.parse(savedContrast); // Converter para booleano
    }
    this.applyContrastMode();
  }

  toggleContrast() {
    this.isHighContrast = !this.isHighContrast;
    // Salvar o estado no localStorage
    localStorage.setItem('highContrast', JSON.stringify(this.isHighContrast));
    this.applyContrastMode();
  }

  // Função para aplicar o contraste no body
  applyContrastMode() {
    if (this.isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }
}
