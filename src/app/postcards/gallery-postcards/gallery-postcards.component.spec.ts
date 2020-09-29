import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryPostcardsComponent } from './gallery-postcards.component';

describe('GalleryPostcardsComponent', () => {
  let component: GalleryPostcardsComponent;
  let fixture: ComponentFixture<GalleryPostcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryPostcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryPostcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
