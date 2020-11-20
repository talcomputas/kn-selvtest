import { Injectable } from '@angular/core';
import { StatisticsApiService } from '@features/questions/services/statistics-api.service';
import { from, Observable } from 'rxjs';

@Injectable()
export class StatisticsService {
  private testStartedAt: number;
  private questionStartedAt: number;
  private questionId: number;
  private userId: string;

  constructor(private statisticsApiService: StatisticsApiService) {
  }

  initUser(): void {
    this.statisticsApiService
      .getUserId()
      .subscribe((value: { id: string }) => (this.userId = value.id));
  }

  initQuestion(questionId: number): void {
    this.questionId = questionId;
    this.questionStartedAt = Date.now();
  }

  setQuestion(
    userAnswer: number | number[] | string | string[],
    correctAnswer: number | number[] | string | string[],
    isCorrect: boolean,
    name: string,
  ): void {
    const totalTime = Date.now() - this.testStartedAt;
    const time = Date.now() - this.questionStartedAt;
    this.sendStatistics(time, totalTime, userAnswer, correctAnswer, isCorrect, name);
  }

  setTestStart(): void {
    this.testStartedAt = Date.now();
  }

  private sendStatistics(
    time: number,
    totalTime: number,
    userAnswer: number | number[] | string | string[],
    correctAnswer: number | number[] | string | string[],
    isCorrect: boolean,
    name: string,
  ): void {
    this.statisticsApiService
      .sendStatistics(
        this.userId,
        this.questionId,
        userAnswer,
        correctAnswer,
        isCorrect,
        time,
        totalTime,
        name,
      )
      .subscribe();
  }

  getBaseData(fromDate: string, toDate: string, test: string): Observable<any> {
    return this.statisticsApiService.getItemData(fromDate, toDate, test);
  }

  getTotalTestsPerDay(fromDate: string, toDate: string): Observable<any> {
    return this.statisticsApiService.getTotalTestsPerDay(fromDate, toDate);
  }

  getTestsPerDay(fromDate: string, toDate: string): Observable<any> {
    return this.statisticsApiService.getTestsPerDay(fromDate, toDate);
  }
}
