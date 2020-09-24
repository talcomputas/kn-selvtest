import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import * as parser from 'fast-xml-parser';

@Injectable()
export class StatisticsApiService {
  private readonly attributeNamePrefix = '#';

  constructor(private http: HttpClient) {
  }

  public getUserId(): Observable<string> {
    const params = new HttpParams().set('nocache', Date.now().toString());
    return this.http
      .get(`${environment.STATISTICS_API}/submituser.php`, {
        responseType: 'text',
        params,
      })
      .pipe(
        map((text: string) =>
          parser.parse(text, {
            ignoreAttributes: false,
            attributeNamePrefix: this.attributeNamePrefix,
          }),
        ),
        map(
          (data: { [key: string]: any }) =>
            data &&
            data.startest &&
            data.startest.user &&
            data.startest.user[`${this.attributeNamePrefix}id`],
        ),
      );
  }

  public sendStatistics(
    userId: string,
    questionId: number,
    answer: number | number[] | string | string[],
    correctAnswer: number | number[] | string | string[],
    isCorrect: boolean,
    answerTime: number,
    totalTime: number,
  ): Observable<any> {
    const params = new HttpParams()
      .set('uid', userId)
      .set('itemid', String(questionId))
      .set('answer', String(answer))
      .set('correctanswer', String(correctAnswer))
      .set('correct', String(isCorrect))
      .set('time', String(answerTime))
      .set('totaltime', String(totalTime))
      .set('nocache', Date.now().toString());

    return this.http.get(
      `${environment.STATISTICS_API}/submititem.php`,
      { responseType: 'text', params },
    );
  }
}
