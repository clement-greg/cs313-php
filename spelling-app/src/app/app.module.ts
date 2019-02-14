import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StarRatingModule } from 'angular-star-rating';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatStepperModule,
  MatTabsModule,
  MatExpansionModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,

} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';
import { SpellingListsComponent } from './pages/spelling-lists/spelling-lists.component';
import { SpellingWordsComponent } from './pages/spelling-words/spelling-words.component';
import { FormsModule } from '@angular/forms';
import { AddStudentComponent } from './pages/add-student/add-student.component';
import { AddListComponent } from './pages/add-list/add-list.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { RatingComponent } from './components/rating.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PubSubService } from './services/pub-sub.service';
import { CongratsComponent } from './components/congrats/congrats.component';

const appRoutes: Routes = [
  { path: '', component: StudentsComponent },
  { path: 'spelling-lists/:student-id', component: SpellingListsComponent },
  { path: 'spelling-words/:spelling-list-id', component: SpellingWordsComponent },
  { path: 'quiz/:spelling-list-id', component: QuizComponent},
  { path: 'home', redirectTo: '/' },
  { path: '**', redirectTo: '/404' },
];


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    SpellingListsComponent,
    SpellingWordsComponent,
    AddStudentComponent,
    AddListComponent,
    QuizComponent,
    RatingComponent,
    CongratsComponent
  ],
  entryComponents: [
    AddStudentComponent,
    AddListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes, { enableTracing: false }  // <-- debugging purposes only
    ),
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      // outerStrokeColor: "#78C000",
      // innerStrokeColor: "#C7E596",
      outerStrokeColor: '#a1b28b',
      innerStrokeColor: '#87ea07',
      animationDuration: 300,
      unitsFontSize: '48px',
      unitsColor: '#87ea07',
      titleFontSize: '48px',
      titleColor: '#87ea07',

    })
  ],
  providers: [ApiService, PubSubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
