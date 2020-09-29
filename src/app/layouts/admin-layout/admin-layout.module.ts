
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { HomeComponent } from 'src/app/home/home.component';
import { CollectionsModule } from 'src/app/collections/collections.module';
import { SamplesModule } from 'src/app/samples/samples.module';
import { StampsModule } from 'src/app/stamps/stamps.module';
import { PostcardsModule } from 'src/app/postcards/postcards.module';
import { StoreModule } from 'src/app/store/store.module';
import { SearchModule } from 'src/app/search/search.module' 


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    /* MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule, */
    CollectionsModule,
    SamplesModule,
    StampsModule,
    PostcardsModule,
    StoreModule,
    SearchModule,
    //MatGridListModule
     ],
  declarations: [
    HomeComponent
    
  ],
 
})

export class AdminLayoutModule { }
