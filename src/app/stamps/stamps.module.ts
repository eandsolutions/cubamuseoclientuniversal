import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryStampComponent } from './gallery-stamp/gallery-stamp.component';
import { StampComponent } from './stamp/stamp.component';
import { InferiorStampComponent } from './inferior-stamp/inferior-stamp.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'src/app/_modal';



@NgModule({
  declarations: [GalleryStampComponent, StampComponent, InferiorStampComponent],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule,
    TranslateModule
  ]
})
export class StampsModule { }
