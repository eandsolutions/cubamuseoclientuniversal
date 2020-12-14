import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostcardsComponent } from './postcards/postcards.component';
import { GalleryPostcardsComponent } from './gallery-postcards/gallery-postcards.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'src/app/_modal';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { CoreModule} from '../core/core.module'


@NgModule({
  declarations: [PostcardsComponent, GalleryPostcardsComponent],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule,
    MatIconModule,
    NgbModule,
    AngularCropperjsModule,
    FormsModule,
    //CoreModule,
    ReactiveFormsModule
  ]
})
export class PostcardsModule { }
