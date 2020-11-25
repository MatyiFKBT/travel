import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryCommentsComponent } from './entry-comments.component';

describe('EntryCommentsComponent', () => {
  let component: EntryCommentsComponent;
  let fixture: ComponentFixture<EntryCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
