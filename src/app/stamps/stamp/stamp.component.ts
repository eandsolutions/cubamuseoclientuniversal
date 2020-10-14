import { TalesServiceService } from './../../core/service/tales-service.service';
import { Component, OnInit } from '@angular/core';
import { CollectionServiceService } from 'src/app/core/service/collection-service.service';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { SamplesServiceService } from 'src/app/core/service/samples-service.service';
import { MetaService } from 'src/app/core/service/meta.service';

@Component({
  selector: 'app-stamp',
  templateUrl: './stamp.component.html',
  styleUrls: ['./stamp.component.css']
})
export class StampComponent implements OnInit {

  homeData: any;
  allTales: any[];
  constructor(
    private collectionService: CollectionServiceService,
    public enviromentVariable: EnviromentVariableServiceService,
    public config: ConfigServiceService,
    private samplesService: SamplesServiceService,
    private talesService: TalesServiceService,
    private metaService: MetaService
  ) {
    this.homeData = {
      titulo: '',
      descripcion: '',
      imagen: ''
    }
    this.enviromentVariable.deleteSection();
    this.initAllTales();
  }

  initAllTales() {
    this.talesService.getAllTales().subscribe(
      (data: any) => {
        this.allTales = data;
      }, err => {

      }
    )

  }
  initSections() {
    this.samplesService.getSamplesCategories().subscribe(
      (data: any[]) => {
        data.forEach(element => {
          this.enviromentVariable.sections.push(element);
        });
        this.enviromentVariable.link = { path: '/gallery-stamp' }
      }, err => {
        console.log(err)
      }
    )
  }

  initComponent() {
    this.collectionService.getCollectionText(2).subscribe(
      (data: any) => {
        if (data.nombre) {
          this.homeData = {
            titulo: data.nombre,
            descripcion: data.descripcion,
            imagen: data.imagen
          }
          this.metaService.setTitle(this.homeData.titulo);
          this.metaService.addTags([
            { name: 'description', content: this.homeData.descripcion.slice(0,500) },
            { name: 'robots', content: 'index, follow' }
          ])
        } else {
          this.homeData = {
            titulo: data[0].nombre,
            descripcion: data[0].descripcion,
            imagen: data[0].imagen
          }
        }
      }, err => {

      }
    )
  }
  initBreadcrumb() {
    let data: any = this.enviromentVariable.getSection();
    this.enviromentVariable.breadcrumbList[1] = {
      name: 'Estampas',
      path: '/stamps'
    };
    this.enviromentVariable.breadcrumbList.splice(2, 2);
    this.enviromentVariable.setBreadcrumb(this.enviromentVariable.breadcrumbList);
  }

  ngOnInit(): void {
    this.enviromentVariable.actualPage = 'stamps';
    this.initBreadcrumb();
    this.enviromentVariable.sections = [];
    this.enviromentVariable.sections.push({
      idCategoriaEstampa: 0,
      nombre: 'Todas las páginas de la sección',
      imagenMenu: 'todas.jpg',
      descripcion: '',
      publicada: 1,
      orden: ''


    });
    this.initSections();
    this.initComponent();
  }

}
