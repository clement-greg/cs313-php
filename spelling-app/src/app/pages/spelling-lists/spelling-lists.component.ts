import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { SpellingList } from 'src/app/models/spelling-list.model';
import { Utilities } from 'src/app/utilities';

@Component({
  selector: 'app-spelling-lists',
  templateUrl: './spelling-lists.component.html',
  styleUrls: ['./spelling-lists.component.css']
})
export class SpellingListsComponent implements OnInit {

  studentId: string;
  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(parameters => {
      if (parameters['student-id']) {
        this.studentId = parameters['student-id'];
        this.apiService.getSpellingLists(this.studentId).subscribe(results => {
          console.log('results:');
          console.log(results);
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

}
