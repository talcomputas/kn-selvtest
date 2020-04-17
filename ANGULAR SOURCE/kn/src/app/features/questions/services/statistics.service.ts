import { Injectable } from '@angular/core';
import { StatisticsApiService } from '@features/questions/services/statistics-api.service';

@Injectable()
export class StatisticsService {
  private testStartedAt: number;
  private questionStartedAt: number;
  private questionId: number;
  private userId: string;

  constructor(private statisticsApiService: StatisticsApiService) {
  }

  initUser(): void {
    this.statisticsApiService.getUserId().subscribe((userId: string) => this.userId = userId);
  }

  initQuestion(questionId: number): void {
    this.questionId = questionId;
    this.questionStartedAt = Date.now();
  }

  setQuestion(userAnswer: number | number[] | string | string[],
              correctAnswer: number | number[] | string | string[],
              isCorrect: boolean): void {
    const totalTime = Date.now() - this.testStartedAt;
    const time = Date.now() - this.questionStartedAt;
    this.sendStatistics(time, totalTime, userAnswer, correctAnswer, isCorrect);
  }

  setTestStart(): void {
    this.testStartedAt = Date.now();
  }

  private sendStatistics(time: number,
                         totalTime: number,
                         userAnswer: number | number[] | string | string[],
                         correctAnswer: number | number[] | string | string[],
                         isCorrect: boolean): void {
    this.statisticsApiService.sendStatistics(
      this.userId,
      this.questionId,
      userAnswer,
      correctAnswer,
      isCorrect,
      time,
      totalTime,
    ).subscribe();
  }
}
