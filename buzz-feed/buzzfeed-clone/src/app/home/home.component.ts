
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = "Bem vindo ao BuzzFeed Clone!";
  
  constructor(private router: Router) {}

  startQuiz() {
    this.router.navigate(['/questions']);
  }
}
