import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable()
export class StatisticsApiService {
  constructor(private http: HttpClient) {}

  public getUserId(): Observable<{ id: string }> {
    return this.http.get<{ id: string }>(`${environment.STATISTICS_API}submituser`);
  }

  public sendStatistics(
    userId: string,
    questionId: number,
    answer: number | number[] | string | string[],
    correctAnswer: number | number[] | string | string[],
    isCorrect: boolean,
    answerTime: number,
    totalTime: number,
    name: string,
  ): Observable<any> {
    const params = new HttpParams()
      .set('uid', userId)
      .set('itemid', String(questionId))
      .set('answer', String(answer))
      .set('correctanswer', String(correctAnswer))
      .set('correct', String(isCorrect))
      .set('time', String(answerTime))
      .set('totaltime', String(totalTime))
      .set('name', name)
      .set('nocache', Date.now().toString());

    return this.http.get(`${environment.STATISTICS_API}submititem`, {
      responseType: 'text',
      params,
    });
  }

  getItemData() {
    return this.http.get(`${environment.STATISTICS_API}itemdata`)
  }
}
