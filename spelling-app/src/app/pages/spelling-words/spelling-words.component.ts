import { Component, OnInit } from '@angular/core';
import { SpellingWord } from 'src/app/models/spelling-word.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Utilities } from 'src/app/utilities';
import { SpellingList } from 'src/app/models/spelling-list.model';
import { MatSnackBar } from '@angular/material';
import { BreadcrumbItem } from 'src/app/interfaces/breadcrumb-provider.interface';

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

  constructor(private route: ActivatedRoute, private apiService: ApiService, private snackBar: MatSnackBar) { }

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

  private _breadCrumbs: BreadcrumbItem[] = [];
  get breadcrumbs(): BreadcrumbItem[] {
    return this._breadCrumbs;
  }


  removeWord(word: SpellingWord) {
    word.removing = true;
    this.apiService.deleteSpellingWord(word).subscribe(results => {
      const index = this.spellingWords.indexOf(word);
      word.removing = false;
      word.doremove = true;
      setTimeout(() => {
        this.spellingWords.splice(index, 1);
        word.doremove = false;
      }, 500);

      const ref = this.snackBar.open('Word Deleted', 'Undo', { duration: 10000 });
      ref.onAction().subscribe(() => {
        this.apiService.unDeleteSpellingWord(word).subscribe(r => {
          this.spellingWords.splice(index, 0, word);
        });
      });
    });

  }

  createNewWord() {
    this.adding = true;
    const word = new SpellingWord();
    word.spellinglistid = this.spellingListId;
    word.id = Utilities.newid();
    word.doremove = false;
    word.word = this.newWord;
    word.createddate = new Date();
    this.apiService.saveSpellingWord(word).subscribe(() => {
      word.doremove = false;
      this.spellingWords.push(word);
      this.newWord = '';
      this.adding = false;
    });
  }
}
