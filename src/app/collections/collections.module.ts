import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperiorCollectionComponent } from './superior-collection/superior-collection.component';
import { InferiorCollectionComponent } from './inferior-collection/inferior-collection.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'src/app/_modal/modal.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { HighlightModule } from '../core/highlight/highlight.module';

@NgModule({
  declarations: [SuperiorCollectionComponent, InferiorCollectionComponent],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule,
    TranslateModule,
    MatGridListModule,
    HighlightModule
  ]
})
export class CollectionsModule { }
