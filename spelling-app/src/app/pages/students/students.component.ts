import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[];
  loadingStudents = false;
  constructor(private apiService: ApiService) { }

  ngOnInit() {

    this.loadingStudents = true;
    this.apiService.getStudents().subscribe(students => {
      console.log('students:');
      console.log(students);
      this.loadingStudents = false;
      this.students = students.records;
    });
  }

}
