import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Student } from 'src/app/models/student.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddStudentComponent } from '../add-student/add-student.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[];
  loading = false;
  constructor(private apiService: ApiService, private dialog: MatDialog, private snackbar: MatSnackBar) { }

  ngOnInit() {

    this.loading = true;
    this.apiService.getStudents().subscribe(students => {
      this.loading = false;
      this.students = students.records;
      if(!this.students) {
        this.students = [];
      }
    });
  }

  addStudent() {
    const ref = this.dialog.open(AddStudentComponent);
    ref.afterClosed().subscribe(results => {
      if (results) {
        if(!this.students) {
          this.students = [];
        }
        this.students.push(results);
      }
    });
  }

  deleteStudent(student: Student) {
    student.deleting = true;
    this.apiService.deleteStudent(student).subscribe(results => {
      const index = this.students.indexOf(student);
      student.deleting = false;
      student.removing = true;
      setTimeout(() => {
        this.students.splice(index, 1);
        student.removing = false;
      }, 500);

      const ref = this.snackbar.open('Student Deleted', 'Undo', { duration: 10000 });
      ref.onAction().subscribe(() => {
        this.apiService.unDeleteStudent(student).subscribe(r => {
          this.students.splice(index, 0, student);
        });
      });
    });
  }

}
