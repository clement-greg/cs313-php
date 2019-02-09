import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SpellingWord } from 'src/app/models/spelling-word.model';
import { SpellingList } from 'src/app/models/spelling-list.model';
import { SpellingWordScore } from 'src/app/models/spelling-word-score.model';
import { Utilities } from 'src/app/utilities';

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

  get currentPercent() {
    if (!this.spellingWords || this.spellingWords.length === 0) {
      return 0;
    }

    return (this.selectedIndex / this.spellingWords.length) * 100;
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
  }

  removeScore(score: SpellingWordScore, spellingWord: SpellingWord) {
    score.deleting = true;
    this.apiService.deleteSpellingWordScore(score).subscribe(results => {
      spellingWord.scores.splice(spellingWord.scores.indexOf(score), 1);
      score.deleting = false;
    });
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
