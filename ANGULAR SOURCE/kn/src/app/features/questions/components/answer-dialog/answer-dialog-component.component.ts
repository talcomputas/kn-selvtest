import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResultAnswer } from '@features/questions/interfaces/result-answer.interface';

@Component({
  selector: 'app-answer-dialog-component',
  templateUrl: './answer-dialog-component.component.html',
  styleUrls: ['./answer-dialog-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswerDialogComponentComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { result: ResultAnswer }) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  public onPrint(): void {
    window.print();
  }
}
