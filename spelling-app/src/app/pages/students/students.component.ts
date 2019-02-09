import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Student } from 'src/app/models/student.model';
import { MatDialog } from '@angular/material';
import { AddStudentComponent } from '../add-student/add-student.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[];
  loading = false;
  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  ngOnInit() {

    this.loading = true;
    this.apiService.getStudents().subscribe(students => {
      console.log('students:');
      console.log(students);
      this.loading = false;
      this.students = students.records;
    });
  }

  addStudent() {
    const ref = this.dialog.open(AddStudentComponent);
    ref.afterClosed().subscribe(results=> {
      if(results) {
        this.students.push(results);
      }
    });
  }

}
