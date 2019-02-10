import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SpellingList } from 'src/app/models/spelling-list.model';
import { Utilities } from 'src/app/utilities';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {

  saving = false;
  listName: string;
  constructor(private api: ApiService, public dialogRef: MatDialogRef<AddListComponent>, 
    @Inject(MAT_DIALOG_DATA) public studentId: string) { }

  ngOnInit() {

    const datePipe = new DatePipe('en-US');
    let dt = new Date();
    while (dt.getDay() !== 1) {
      dt.setDate(dt.getDate() + 1);
    }

    this.listName = 'List: ' + datePipe.transform(dt, 'shortDate');
  }

  save() {
    this.saving = true;

    const list = new SpellingList();
    list.id = Utilities.newid();
    list.name = this.listName;
    list.studentid = this.studentId;
    list.createddate = new Date();
 

    this.api.saveSpellingList(list).subscribe(results => {
      this.dialogRef.close(list);
    });
  }


}
