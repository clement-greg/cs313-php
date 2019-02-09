import { Component, OnInit } from '@angular/core';
import { SpellingWord } from 'src/app/models/spelling-word.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Utilities } from 'src/app/utilities';

@Component({
  selector: 'app-spelling-words',
  templateUrl: './spelling-words.component.html',
  styleUrls: ['./spelling-words.component.css']
})
export class SpellingWordsComponent implements OnInit {

  spellingListId: string;
  spellingWords: SpellingWord[];
  newWord: string;
  adding = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe(parameters => {
      if (parameters['spelling-list-id']) {
        this.spellingListId = parameters['spelling-list-id'];

        this.apiService.getSpellingWords(this.spellingListId).subscribe(results => {
          this.spellingWords = results.records;
        });

      }
    });
  }

  removeWord(word) {
    this.apiService.deleteSpellingWord(word).subscribe(() => {
      this.spellingWords.splice(this.spellingWords.indexOf(word), 1);
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
