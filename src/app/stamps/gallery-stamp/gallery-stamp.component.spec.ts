import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryStampComponent } from './gallery-stamp.component';

describe('GalleryStampComponent', () => {
  let component: GalleryStampComponent;
  let fixture: ComponentFixture<GalleryStampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryStampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryStampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
