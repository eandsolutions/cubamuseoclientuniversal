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
  query: string;
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
    this.query = ''

    activateRoute.params.subscribe(
      param => {
        if (param.id)
          this.stampService.getTaleById(param.id).subscribe(
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
              if (param.query) {
                this.query = param.query
                this.highlight()
              }
           
              this.metaService.setTitle(this.stamp.titulo);
              this.metaService.addTags([
                { name: 'description', content: this.stamp.descripcion },
                { name: 'robots', content: 'index, follow' },
                { name: 'og:description', content: this.stamp.descripcion },
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

  highlight() {
    setTimeout(() => {
      let el = document.getElementById('text-desc-stamp')
      el.childNodes.forEach(element => {
        let e = element as HTMLElement
        if (e.innerText) {
          let html = e.innerHTML
          let i = html.indexOf(this.query)
          if(i>1){
            html = html.substring(0, i) + "<mark class='my-mark'>" + html.substring(i, i + this.query.length) + "</mark>" + html.substring(i + this.query.length);
            e.innerHTML = html;
          }

        }

      });
    }, 600);

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
