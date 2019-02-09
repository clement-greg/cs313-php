import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { SpellingList } from 'src/app/models/spelling-list.model';
import { Utilities } from 'src/app/utilities';
import { Student } from 'src/app/models/student.model';
import { AddListComponent } from '../add-list/add-list.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-spelling-lists',
  templateUrl: './spelling-lists.component.html',
  styleUrls: ['./spelling-lists.component.css']
})
export class SpellingListsComponent implements OnInit {

  loading = false;
  studentId: string;
  spellingLists: SpellingList[];
  student: Student;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {

    this.loading = true;
    this.route.params.subscribe(parameters => {
      if (parameters['student-id']) {
        this.studentId = parameters['student-id'];

        this.apiService.getStudent(this.studentId).subscribe(results => {
          this.student = results.records[0];
        });
        this.apiService.getSpellingLists(this.studentId).subscribe(results => {
          console.log('results:');
          console.log(results);
          this.loading = false;
          this.spellingLists = results.records;
        });
      }
    });
  }

  createNew() {
    const list = new SpellingList();
    list.id = Utilities.newid();
    list.name = 'Test List!!';
    list.studentid = this.studentId;
    list.createddate = new Date();

    this.apiService.saveSpellingList(list).subscribe(() => { });
  }

  addList() {
    const ref = this.dialog.open(AddListComponent, { data: this.studentId });
    ref.afterClosed().subscribe(results => {
      if (results) {
        this.spellingLists.push(results);
      }
    });
  }

}
