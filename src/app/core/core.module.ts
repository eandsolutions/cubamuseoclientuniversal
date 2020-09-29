import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamplesServiceService } from './service/samples-service.service';
import { TalesServiceService } from './service/tales-service.service';
import { CollectionServiceService } from './service/collection-service.service';
import { VpostServiceService } from './service/vpost-service.service';
import { StoreServiceService } from './service/store-service.service';
import { ConfigServiceService } from './service/config-service.service';
import { EnviromentVariableServiceService } from './service/enviroment-variable-service.service';
import { LocalStorageService } from './service/local-storage.service'


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    SamplesServiceService,
    TalesServiceService,
    CollectionServiceService,
    VpostServiceService,
    StoreServiceService,
    ConfigServiceService,
    EnviromentVariableServiceService,
    LocalStorageService
  ]
})
export class CoreModule { }
