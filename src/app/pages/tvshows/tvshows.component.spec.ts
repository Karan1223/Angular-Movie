import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TVShowsComponent } from './tvshows.component';

describe('TVShowsComponent', () => {
  let component: TVShowsComponent;
  let fixture: ComponentFixture<TVShowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TVShowsComponent]
    });
    fixture = TestBed.createComponent(TVShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
