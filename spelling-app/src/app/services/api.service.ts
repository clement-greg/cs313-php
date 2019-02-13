import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { SpellingList } from '../models/spelling-list.model';
import { SpellingWord } from '../models/spelling-word.model';
import { SpellingWordScore } from '../models/spelling-word-score.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //baseUrl = 'http://localhost:8000/project1/api/'
  constructor(private http: HttpClient) { }


  get baseUrl() {
    if (window.location.href.indexOf('localhost') > -1) {
      return 'http://localhost:8000/project1/api/';
    }

    return 'https://secret-wildwood-23194.herokuapp.com/project1/api/';
  }
  getStudents(): Observable<any> {

    return this.http.get(this.baseUrl + 'get-students.php');
  }

  getSpellingList(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'get-spelling-list.php?id=' + id);
  }

  saveStudent(student: Student): Observable<any> {
    return this.http.post(this.baseUrl + 'post-student.php', student);
  }

  getSpellingLists(studentId: string): Observable<any> {
    return this.http.get(this.baseUrl + 'get-spelling-lists.php?studentid=' + studentId);
  }

  saveSpellingList(spellingList: SpellingList) {
    return this.http.post(this.baseUrl + 'post-spelling-list.php', spellingList);
  }

  getSpellingWords(spellingListId: string): Observable<any> {
    return this.http.get(this.baseUrl + 'get-spelling-words.php?spellinglistid=' + spellingListId);
  }

  saveSpellingWord(spellingWord: SpellingWord): Observable<any> {
    return this.http.post(this.baseUrl + 'post-spelling-word.php', spellingWord);
  }

  deleteSpellingWord(spellingWord: SpellingWord): Observable<any> {
    return this.http.delete(this.baseUrl + 'delete-spelling-word.php?id=' + spellingWord.id);
  }

  deleteSpellingList(spellingList: SpellingList): Observable<any> {
    return this.http.delete(this.baseUrl + 'delete-spelling-list.php?id=' + spellingList.id);
  }

  getStudent(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'get-student.php?id=' + id);
  }

  getSpellingWordScores(spellingWordId: string): Observable<any> {
    return this.http.get(this.baseUrl + 'get-spelling-word-scores.php?spellingwordid=' + spellingWordId);
  }

  saveSpellingWordScore(spellingWordScore: SpellingWordScore): Observable<any> {
    return this.http.post(this.baseUrl + 'post-spelling-word-score.php', spellingWordScore);
  }

  deleteSpellingWordScore(spellingWordScore: SpellingWordScore): Observable<any> {
    return this.http.delete(this.baseUrl + 'delete-spelling-word.score.php?id=' + spellingWordScore.id);
  }

  getWordDefinition(spellingWord: SpellingWord): Observable<any> {
    return this.http.get('https://gregbclement.com/api/spellingword/definition?word=' + spellingWord.word);
  }

  deleteStudent(student: Student): Observable<any> {
    return this.http.delete(this.baseUrl + 'delete-student.php?id=' + student.id);
  }

  unDeleteStudent(student: Student): Observable<any> {
    return this.http.put(this.baseUrl + 'un-delete-student.php?id=' + student.id, null);
  }

  unDeleteSpellingList(spellingList: SpellingList): Observable<any> {
    return this.http.put(this.baseUrl + 'un-delete-spelling-list.php?id=' + spellingList.id, null);
  }

  unDeleteSpellingWord(spellingWord: SpellingWord): Observable<any> {
    return this.http.put(this.baseUrl + 'un-delete-spelling-word.php?id=' + spellingWord.id, null);
  }
}
