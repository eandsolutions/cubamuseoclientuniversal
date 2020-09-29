import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InferiorSamplesComponent } from './inferior-samples.component';

describe('InferiorSamplesComponent', () => {
  let component: InferiorSamplesComponent;
  let fixture: ComponentFixture<InferiorSamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InferiorSamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InferiorSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
