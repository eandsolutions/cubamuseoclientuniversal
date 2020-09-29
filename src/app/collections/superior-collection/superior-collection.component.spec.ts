import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperiorCollectionComponent } from './superior-collection.component';

describe('SuperiorCollectionComponent', () => {
  let component: SuperiorCollectionComponent;
  let fixture: ComponentFixture<SuperiorCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperiorCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperiorCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
