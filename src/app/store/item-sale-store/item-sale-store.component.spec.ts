import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSaleStoreComponent } from './item-sale-store.component';

describe('ItemSaleStoreComponent', () => {
  let component: ItemSaleStoreComponent;
  let fixture: ComponentFixture<ItemSaleStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSaleStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSaleStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
