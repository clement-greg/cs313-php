import { Component, OnInit } from '@angular/core';
import { SpellingWord } from 'src/app/models/spelling-word.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Utilities } from 'src/app/utilities';
import { SpellingList } from 'src/app/models/spelling-list.model';

@Component({
  selector: 'app-spelling-words',
  templateUrl: './spelling-words.component.html',
  styleUrls: ['./spelling-words.component.css']
})
export class SpellingWordsComponent implements OnInit {

  spellingListId: string;
  spellingWords: SpellingWord[];
  spellingList: SpellingList;
  newWord: string;
  adding = false;
  loading = false;

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
        });

      }
    });
  }

  removeWord(word) {
    word.removing = true;
    this.apiService.deleteSpellingWord(word).subscribe(() => {
      word.doremove = true;

      setTimeout(() => {

        this.spellingWords.splice(this.spellingWords.indexOf(word), 1);
      }, 500);
      word.removing = false;
    });

  }

  createNewWord() {
    this.adding = true;
    const word = new SpellingWord();
    word.spellinglistid = this.spellingListId;
    word.id = Utilities.newid();
    word.word = this.newWord;
    word.createddate = new Date();
    this.apiService.saveSpellingWord(word).subscribe(() => {
      this.spellingWords.push(word);
      this.newWord = '';
      this.adding = false;
    });
  }
}
