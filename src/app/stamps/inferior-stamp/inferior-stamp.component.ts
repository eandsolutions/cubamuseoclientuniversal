import { Component, OnInit } from '@angular/core';
import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SamplesServiceService } from 'src/app/core/service/samples-service.service';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { ModalService } from 'src/app/_modal';
import { TalesServiceService } from 'src/app/core/service/tales-service.service';
import { MetaService } from 'src/app/core/service/meta.service';

@Component({
  selector: 'app-inferior-stamp',
  templateUrl: './inferior-stamp.component.html',
  styleUrls: ['./inferior-stamp.component.css']
})
export class InferiorStampComponent implements OnInit {

  stamp: any;
  constructor(
    public config: ConfigServiceService,
    private activateRoute: ActivatedRoute,
    private samplesService: SamplesServiceService,
    public enviromentVariable: EnviromentVariableServiceService,
    private modalService: ModalService,
    private stampService: TalesServiceService,
    private metaService: MetaService,
    private router: Router
  ) {
    this.stamp = {
      descripcion: '',
      titulo: '',
      nombre: '',
      carpeta: '',
      id: 0
    }

    activateRoute.params.subscribe(
      data => {
        if (data.id)
          this.stampService.getTaleById(data.id).subscribe(
            (data: any) => {
              if(data.nombre){
                this.stamp = {
                  descripcion: data.texto,
                  titulo: data.titulo,
                  nombre: data.nombre,
                  carpeta: data.carpeta,
                  id: data.idEstampa
                }
              }else{
                this.stamp = {
                  descripcion: data[0].texto,
                  titulo: data[0].titulo,
                  nombre: data[0].nombre,
                  nombre_es: data[0].nombre_es,
                  carpeta: data[0].carpeta,
                  id: data[0].idEstampa
                }
              }
           
              this.metaService.setTitle(this.stamp.titulo);
              this.metaService.addTags([
                { name: 'description', content: this.stamp.descripcion.slice(0, 500) },
                { name: 'robots', content: 'index, follow' },
                { name: 'og:description', content: this.stamp.descripcion.slice(0, 500) },
                { name: 'og:robots', content: 'index, follow' },
                { name: 'keywords', content: this.stamp.titulo },
                { name: 'og:keywords', content: this.stamp.titulo },
                { name: 'og:url', content: 'http://cubamuseo.net' + this.router.url },

              ])
            }, err => {

            }
          )
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

  ngOnInit(): void {
    this.enviromentVariable.actualPage = 'stamps';
    this.enviromentVariable.sections = [];
    this.enviromentVariable.sections.push({
      idCategoriaEstampa: 0,
      nombre: 'Todas',
      imagenMenu: 'todas.jpg',
      descripcion: '',
      publicada: 1,
      orden: ''


    });
    this.initSections();
  }



}
