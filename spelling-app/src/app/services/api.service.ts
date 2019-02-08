import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { SpellingList } from '../models/spelling-list.model';
import { SpellingWord } from '../models/spelling-word.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:8000/project1/api/'
  constructor(private http: HttpClient) { }


  getStudents(): Observable<any> {

    return this.http.get(this.baseUrl + 'get-students.php');
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
}
