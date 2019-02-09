import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Student } from 'src/app/models/student.model';
import { Utilities } from 'src/app/utilities';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  saving = false;
  studentName: string;
  constructor(private api: ApiService, public dialogRef: MatDialogRef<AddStudentComponent>) { }

  ngOnInit() {
  }

  save() {
    this.saving = true;

    const student = new Student();
    student.id = Utilities.newid();
    student.name = this.studentName;

    this.api.saveStudent(student).subscribe(results => {
      this.dialogRef.close(student);
    });
  }

}
