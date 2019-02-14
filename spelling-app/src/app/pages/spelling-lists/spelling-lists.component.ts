import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { SpellingList } from 'src/app/models/spelling-list.model';
import { Utilities } from 'src/app/utilities';
import { Student } from 'src/app/models/student.model';
import { AddListComponent } from '../add-list/add-list.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { BreadcrumbItem } from 'src/app/interfaces/breadcrumb-provider.interface';

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
  constructor(private apiService: ApiService, private route: ActivatedRoute, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.loading = true;
    this.route.params.subscribe(parameters => {
      if (parameters['student-id']) {
        this.studentId = parameters['student-id'];

        this.apiService.getStudent(this.studentId).subscribe(results => {
          this.student = results.records[0];
          const homeBreadcrumb = new BreadcrumbItem();
          homeBreadcrumb.name = 'Home';
          homeBreadcrumb.url = '/';
          this._breadCrumbs.push(homeBreadcrumb);
        });
        this.apiService.getSpellingLists(this.studentId).subscribe(results => {
          this.loading = false;
          if (results) {
            this.spellingLists = results.records;
          }
        });
      }
    });
  }

  private _breadCrumbs: BreadcrumbItem[] = [];
  get breadcrumbs(): BreadcrumbItem[] {
    return this._breadCrumbs;
  }



  deleteList(list: SpellingList) {
    list.deleting = true;
    this.apiService.deleteSpellingList(list).subscribe(results => {
      const index = this.spellingLists.indexOf(list);
      list.deleting = false;
      list.removing = true;
      setTimeout(() => {
        this.spellingLists.splice(index, 1);
        list.removing = false;
      }, 500);

      const ref = this.snackBar.open('List Deleted', 'Undo', { duration: 10000 });
      ref.onAction().subscribe(() => {
        this.apiService.unDeleteSpellingList(list).subscribe(r => {
          this.spellingLists.splice(index, 0, list);
        });
      });
    });
  }


  addList() {
    const ref = this.dialog.open(AddListComponent, { data: this.studentId });
    ref.afterClosed().subscribe(results => {
      if (results) {
        if (!this.spellingLists) {
          this.spellingLists = [];
        }
        this.spellingLists.push(results);
      }
    });
  }

}
