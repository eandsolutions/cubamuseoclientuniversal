import { Component, OnInit } from '@angular/core';
import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { ActivatedRoute } from '@angular/router';
import { SamplesServiceService } from 'src/app/core/service/samples-service.service';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { TalesServiceService } from 'src/app/core/service/tales-service.service';
import { MetaService } from 'src/app/core/service/meta.service';

@Component({
  selector: 'app-gallery-stamp',
  templateUrl: './gallery-stamp.component.html',
  styleUrls: ['./gallery-stamp.component.css']
})
export class GalleryStampComponent implements OnInit {

  gallery: any[];
  id: number;
  section: any;

  constructor(
    public config: ConfigServiceService,
    private activateRoute: ActivatedRoute,
    private talesService: TalesServiceService,
    private samplesService: SamplesServiceService,
    public enviromentVariable: EnviromentVariableServiceService,
    private metaService: MetaService
  ) {
    this.gallery = [];
    activateRoute.params.subscribe(
      data => {
        if (data.id) {
          this.id = +data.id;
          if (this.id == 0)
            this.enviromentVariable.setSection({
              idCategoriaEstampa: 0,
              nombre: 'Todas',
              imagenMenu: 'todas.jpg',
              descripcion: '',
              publicada: 1,
              orden: ''
            });
          this.initGallery(+data.id)
          //this.section = JSON.parse(window.localStorage.getItem('section'));
        }
      }
    )
  }

  initGallery(id: number) {
    if (id == 0) {
      this.talesService.getAllTales().subscribe(
        (data: any) => {
          this.gallery = data;
        }, err => {

        }
      )
    }
    else {
      this.talesService.getTalesByCategory(id).subscribe(
        (data: any) => {
          this.gallery = data;
        }, err => {

        }
      )
    }

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

  initBreadcrumb() {
    let data: any = this.enviromentVariable.getSection();

    if (data != 0) {
      this.section = JSON.parse(data);
      console.log(this.section)
      this.metaService.setTitle(JSON.stringify(data.nombre))
      this.enviromentVariable.breadcrumbList[1] = {
        name: 'Estampas',
        path: '/samples'
      };

      this.enviromentVariable.breadcrumbList[2] = {
        name: JSON.parse(data).nombre,
        path: '/gallery-stamp/' + JSON.parse(data).idCategoriaEstampa
      };
      console.log('entro')
      this.enviromentVariable.setBreadcrumb(this.enviromentVariable.breadcrumbList);

    } else {
      this.talesService.getTaleCategoryById(this.id).subscribe(
        (data: any) => {
          this.enviromentVariable.setSection(data);
          this.section = data;
          console.log(this.section)
          this.metaService.setTitle(data.nombre)
          this.enviromentVariable.breadcrumbList[1] = {
            name: 'Estampas',
            path: '/samples'
          };

          this.enviromentVariable.breadcrumbList[2] = {
            name: data.nombre,
            path: '/gallery-stamp/' + data.idCategoriaEstampa
          };
          this.enviromentVariable.setBreadcrumb(this.enviromentVariable.breadcrumbList);

        }
      )
    }
    //this.enviromentVariable.setBreadcrumb(this.enviromentVariable.breadcrumbList);
  }

  setBreadcrumb(item) {
    this.enviromentVariable.breadcrumbList[3] = {
      name: item.nombre,
      path: '/inferior-stamp/' + item.idEstampa
    };
    this.enviromentVariable.setBreadcrumb(this.enviromentVariable.breadcrumbList);
  }

  ngOnInit(): void {

    this.enviromentVariable.actualPage = 'stamps';
    this.enviromentVariable.breadcrumbList.splice(3, 1);
    this.enviromentVariable.sections = [];
    this.enviromentVariable.sections.push({
      idCategoriaEstampa: 0,
      nombre: 'Todas',
      imagenMenu: 'todas.jpg',
      descripcion: '',
      publicada: 1,
      orden: ''
    });
    this.initBreadcrumb();
    this.initSections();
  }

}
