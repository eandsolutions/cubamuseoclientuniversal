import { Component, OnInit } from '@angular/core';
import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { ActivatedRoute } from '@angular/router';
import { TalesServiceService } from 'src/app/core/service/tales-service.service';
import { SamplesServiceService } from 'src/app/core/service/samples-service.service';
import { StoreServiceService } from 'src/app/core/service/store-service.service';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';

@Component({
  selector: 'app-item-sale-store',
  templateUrl: './item-sale-store.component.html',
  styleUrls: ['./item-sale-store.component.css']
})
export class ItemSaleStoreComponent implements OnInit {

  item: any;
  constructor(
    public config: ConfigServiceService,
    private activateRoute: ActivatedRoute,
    private talesService: TalesServiceService,
    private samplesService: SamplesServiceService,
    private storeService: StoreServiceService,
    public enviromentVariable: EnviromentVariableServiceService,
  ) {
    this.item = {
      titulo: '',
      imagen_ampiada: '',
      nombre: '',
      precio: '',
      estado: '',
      descripcion: '',
      precio_envio_fuera: ''
    }
    activateRoute.params.subscribe(
      data => {
        if (data.id) {
          this.initComponent(data.id)
        }
      }
    )
  }

  initComponent(id: number) {
    this.storeService.getAdById(id).subscribe(
      (data: any) => {
        this.item = data;
      }, err => {

      }
    )
  }

  getSection() {
    let data: any = this.enviromentVariable.getSection()
    if (data == 0) {
      return 0
    } else {
      return JSON.parse(data).nombre
    }

  }

  initSections() {
    this.storeService.getStoreCategories().subscribe(
      (data: any[]) => {
        this.enviromentVariable.sections = data;
        this.enviromentVariable.link = { path: '/gallery-store' }
      }, err => {
        console.log(err)
      }
    )
  }

  ngOnInit(): void {
    this.enviromentVariable.actualPage = 'store';
    this.initSections();
  }

}
