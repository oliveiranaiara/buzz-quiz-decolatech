import { Component, OnInit } from '@angular/core';
import quiz_questions from '../../../assets/data/quizz.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  title: string = "";
  questions: any[] = [];
  questionIndex: number = 0;
  selectedAnswers: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.title = quiz_questions.title;
    this.questions = quiz_questions.questions;
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
 questions.component.ts - exemplo de conteúdo
