import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellingListsComponent } from './spelling-lists.component';

describe('SpellingListsComponent', () => {
  let component: SpellingListsComponent;
  let fixture: ComponentFixture<SpellingListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellingListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellingListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
