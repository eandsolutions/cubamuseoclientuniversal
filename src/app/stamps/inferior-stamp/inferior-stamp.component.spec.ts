import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InferiorStampComponent } from './inferior-stamp.component';

describe('InferiorStampComponent', () => {
  let component: InferiorStampComponent;
  let fixture: ComponentFixture<InferiorStampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InferiorStampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InferiorStampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
