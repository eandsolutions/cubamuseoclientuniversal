import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerySamplesComponent } from './gallery-samples.component';

describe('GallerySamplesComponent', () => {
  let component: GallerySamplesComponent;
  let fixture: ComponentFixture<GallerySamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallerySamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GallerySamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
