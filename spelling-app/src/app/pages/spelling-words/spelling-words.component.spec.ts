import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellingWordsComponent } from './spelling-words.component';

describe('SpellingWordsComponent', () => {
  let component: SpellingWordsComponent;
  let fixture: ComponentFixture<SpellingWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellingWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellingWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
