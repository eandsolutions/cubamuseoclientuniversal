import { Routes } from '@angular/router';

import { HomeComponent } from 'src/app/home/home.component';
import { SuperiorCollectionComponent } from 'src/app/collections/superior-collection/superior-collection.component';
import { InferiorCollectionComponent } from 'src/app/collections/inferior-collection/inferior-collection.component';
import { SamplesComponent } from 'src/app/samples/samples/samples.component';
import { GallerySamplesComponent } from 'src/app/samples/gallery-samples/gallery-samples.component';
import { InferiorSamplesComponent } from 'src/app/samples/inferior-samples/inferior-samples.component';
import { GalleryStampComponent } from 'src/app/stamps/gallery-stamp/gallery-stamp.component';
import { InferiorStampComponent } from 'src/app/stamps/inferior-stamp/inferior-stamp.component';
import { StampComponent } from 'src/app/stamps/stamp/stamp.component';
import { PostcardsComponent } from 'src/app/postcards/postcards/postcards.component';
import { GalleryPostcardsComponent } from 'src/app/postcards/gallery-postcards/gallery-postcards.component';
import { StoreComponent } from 'src/app/store/store/store.component';
import { GalleryStoreComponent } from 'src/app/store/gallery-store/gallery-store.component';
import { ItemSaleStoreComponent } from 'src/app/store/item-sale-store/item-sale-store.component';
import { SearchComponent } from 'src/app/search/search/search.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'home', component: HomeComponent },
    { path: 'superior-collection/:id', component: SuperiorCollectionComponent },
    { path: 'inferior-collection/:id', component: InferiorCollectionComponent },
    { path: 'samples', component: SamplesComponent },
    { path: 'gallery-samples/:id', component: GallerySamplesComponent },
    { path: 'inferior-samples/:id', component: InferiorSamplesComponent },
    { path: 'stamps', component: StampComponent },
    { path: 'gallery-stamp/:id', component: GalleryStampComponent },
    { path: 'inferior-stamp/:id', component: InferiorStampComponent },
    { path: 'postcards', component: PostcardsComponent },
    { path: 'gallery-postcards/:id', component: GalleryPostcardsComponent },
    { path: 'store', component: StoreComponent },
    { path: 'gallery-store/:id', component: GalleryStoreComponent },
    { path: 'gallery-store/:id', component: GalleryStoreComponent },
    { path: 'item-sale-store/:id', component: ItemSaleStoreComponent },
    { path: 'search/:query', component: SearchComponent },
    { path: 'search', component: SearchComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
