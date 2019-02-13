import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SpellingWord } from 'src/app/models/spelling-word.model';
import { SpellingList } from 'src/app/models/spelling-list.model';
import { SpellingWordScore } from 'src/app/models/spelling-word-score.model';
import { Utilities } from 'src/app/utilities';
import { BreadcrumbItem } from 'src/app/interfaces/breadcrumb-provider.interface';
declare var responsiveVoice: any;

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

          const homeBreadcrumb = new BreadcrumbItem();
          homeBreadcrumb.name = 'Home';
          homeBreadcrumb.url = '/';
          this._breadCrumbs.push(homeBreadcrumb);
          
          const breadcrumb = new BreadcrumbItem();
          breadcrumb.name = this.spellingList.studentname;
          breadcrumb.url = '/spelling-lists/' + this.spellingList.studentid;
          this._breadCrumbs.push(breadcrumb);

          const listBreadcrumb = new BreadcrumbItem();
          listBreadcrumb.name = this.spellingList.name;
          listBreadcrumb.url = '/spelling-words/' + this.spellingListId;
          this._breadCrumbs.push(listBreadcrumb);
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

  get currentPercent() {
    if (!this.spellingWords || this.spellingWords.length === 0) {
      return 0;
    }

    return (this.selectedIndex / this.spellingWords.length) * 100;
  }

  private _breadCrumbs: BreadcrumbItem[] = [];
  get breadcrumbs(): BreadcrumbItem[] {
    return this._breadCrumbs;
  }


  loadScores(index: number) {
    if (!this.spellingWords) {
      return;
    }
    const spellingWord = this.spellingWords[index];

    if (spellingWord && !spellingWord.scores) {
      this.apiService.getSpellingWordScores(spellingWord.id).subscribe(scores => {
        if (scores) {
          spellingWord.scores = scores.records;
          spellingWord.scores.forEach(score => {
            score.scoredate = new Date(score.scoredate);
          });
        } else {
          spellingWord.scores = [];
        }
      });


    }

    if(spellingWord && !spellingWord.definition) {
      this.apiService.getWordDefinition(spellingWord).subscribe(definition=> {
        spellingWord.definition = definition;
      });
    }
  }

  removeScore(score: SpellingWordScore, spellingWord: SpellingWord) {
    score.deleting = true;
    this.apiService.deleteSpellingWordScore(score).subscribe(results => {
      spellingWord.scores.splice(spellingWord.scores.indexOf(score), 1);
      score.deleting = false;
    });
  }

  speakWord(word: SpellingWord) {
    responsiveVoice.speak(word.word, 'US English Female');
  }

  recordRating($data, word: SpellingWord) {

    const score = new SpellingWordScore();
    score.id = Utilities.newid();
    score.score = $data.rating;
    score.spellingwordid = word.id;
    score.scoredate = new Date();

    this.apiService.saveSpellingWordScore(score).subscribe(results => {
      word.scores.push(score);
      this.selectedIndex++;

    });
    console.log($data);
    console.log(word);
  }
}
