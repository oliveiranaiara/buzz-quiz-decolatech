
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Você seria...</h2>
      <p>{{ getCharacterDescription() }}</p>
      <button (click)="restart()">Tentar Novamente</button>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      text-align: center;
    }
    button {
      margin: 10px;
      padding: 10px 20px;
    }
  `]
})
export class ResultComponent {
  result: string = '';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.result = navigation.extras.state['result'];
    }
  }

  getCharacterDescription(): string {
    switch(this.result) {
      case 'Coragem':
        return 'Harry Potter! Corajoso e determinado, sempre pronto para defender seus amigos.';
      case 'Inteligência':
        return 'Hermione Granger! Inteligente e estudiosa, usa o conhecimento para ajudar os outros.';
      case 'Lealdade':
        return 'Rony Weasley! Leal e bem-humorado, um amigo para todas as horas.';
      case 'Ambição':
        return 'Draco Malfoy! Ambicioso e astuto, determinado a alcançar seus objetivos.';
      default:
        return 'Um bruxo muito especial!';
    }
  }

  restart(): void {
    this.router.navigate(['/']);
  }
}
