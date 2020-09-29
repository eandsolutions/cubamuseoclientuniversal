import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryStoreComponent } from './gallery-store/gallery-store.component';
import { StoreComponent } from './store/store.component';
import { ItemSaleStoreComponent } from './item-sale-store/item-sale-store.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [GalleryStoreComponent, StoreComponent, ItemSaleStoreComponent],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class StoreModule { }
