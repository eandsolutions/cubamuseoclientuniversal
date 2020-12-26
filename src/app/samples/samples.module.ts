import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamplesComponent } from './samples/samples.component';
import { InferiorSamplesComponent } from './inferior-samples/inferior-samples.component';
import { GallerySamplesComponent } from './gallery-samples/gallery-samples.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'src/app/_modal';

@NgModule({
  declarations: [SamplesComponent, InferiorSamplesComponent, GallerySamplesComponent],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule,
    TranslateModule
  ]
})
export class SamplesModule { }
