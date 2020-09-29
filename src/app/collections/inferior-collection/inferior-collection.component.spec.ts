import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InferiorCollectionComponent } from './inferior-collection.component';

describe('InferiorCollectionComponent', () => {
  let component: InferiorCollectionComponent;
  let fixture: ComponentFixture<InferiorCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InferiorCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InferiorCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
