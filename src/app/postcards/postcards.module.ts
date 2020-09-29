import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostcardsComponent } from './postcards/postcards.component';
import { GalleryPostcardsComponent } from './gallery-postcards/gallery-postcards.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'src/app/_modal';


@NgModule({
  declarations: [PostcardsComponent, GalleryPostcardsComponent],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule
  ]
})
export class PostcardsModule { }
