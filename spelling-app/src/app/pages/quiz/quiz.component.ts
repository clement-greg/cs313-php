import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SpellingWord } from 'src/app/models/spelling-word.model';
import { SpellingList } from 'src/app/models/spelling-list.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {


  spellingListId: string;
  spellingWords: SpellingWord[];
  spellingList: SpellingList;
  newWord: string;
  adding = false;
  loading = false;
  selectedIndex = 0;
  wordsLoaded = false;
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe(parameters => {
      if (parameters['spelling-list-id']) {
        this.spellingListId = parameters['spelling-list-id'];

        this.apiService.getSpellingList(this.spellingListId).subscribe(results => {
          this.spellingList = results.records[0];
        });

        this.loading = true;
        this.apiService.getSpellingWords(this.spellingListId).subscribe(results => {
          this.loading = false;
          if (results) {
            this.spellingWords = results.records;

          } else {
            this.spellingWords = [];
          }
          setTimeout(() => this.wordsLoaded = true);
        });

      }
    });
  }
}
