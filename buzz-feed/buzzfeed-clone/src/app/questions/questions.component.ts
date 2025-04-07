
import { Component, OnInit } from '@angular/core';
import quiz_questions from '../../assets/data/quizz.json';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>{{ title }}</h2>
      <div *ngIf="questions[questionIndex]">
        <p>{{ questions[questionIndex].question }}</p>
        <button *ngFor="let a of questions[questionIndex].answers" (click)="choose(a)">{{ a }}</button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      text-align: center;
    }
    button {
      margin: 5px;
      padding: 10px;
    }
  `]
})
export class QuestionsComponent implements OnInit {
  title: string = "";
  questions: any[] = [];
  questionIndex: number = 0;
  selectedAnswers: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if(quiz_questions) {
      this.title = quiz_questions.title;
      this.questions = quiz_questions.questions;
    }
  }

  choose(answer: string): void {
    this.selectedAnswers.push(answer);
    this.nextStep();
  }

  nextStep(): void {
    this.questionIndex++;
    if (this.questionIndex < this.questions.length) return;
    const result = this.getResult();
    this.router.navigate(['result'], { state: { result } });
  }

  getResult(): string {
    const frequency = this.selectedAnswers.reduce((acc: any, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(frequency).reduce((a, b) => (frequency[a] > frequency[b] ? a : b));
  }
}
