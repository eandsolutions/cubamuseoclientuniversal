import { Component, OnInit } from '@angular/core';
//import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { CollectionServiceService } from 'src/app/core/service/collection-service.service';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { MetaService } from 'src/app/core/service/meta.service';
import { param } from 'jquery';
//import { CollectionServiceService } from 'src/app/core/service/collection-service.service';

@Component({
  selector: 'app-superior-collection',
  templateUrl: './superior-collection.component.html',
  styleUrls: ['./superior-collection.component.scss']
})
export class SuperiorCollectionComponent implements OnInit {

  collection: any;
  gallery: any[];
  galleryXX: any[];
  query: string;
  constructor(
    public config: ConfigServiceService,
    private activateRoute: ActivatedRoute,
    public enviromentVariable: EnviromentVariableServiceService,
    private collectionService: CollectionServiceService,
    private router: Router,
    private metaService: MetaService
  ) {
    this.collection = {
      descripcion: '',
      titulo: '',
      imagen: '',
      nombre: '',
      id: ''
    }
    this.query = ''
    this.gallery = [];
    this.galleryXX = [];

    if (this.enviromentVariable.sections.length == 0)
      this.initSections()
    activateRoute.params.subscribe(
      param => {
        console.log(param)
        if (param.id)
          this.collectionService.getSectionById(param.id).subscribe(
            (data: any) => {

              if (data.nombre) {
                this.collection = {
                  descripcion: data.descripcion,
                  titulo: data.titulo,
                  imagen: data.imagen,
                  nombre: data.nombre,
                  id: data.idSeccion
                }

                this.enviromentVariable.setSection(data)
              } else {
                this.collection = {
                  descripcion: data[0].descripcion,
                  titulo: data[0].titulo,
                  imagen: data[0].imagen,
                  nombre: data[0].nombre,
                  nombre_es: data[0].nombre_es,
                  id: data[0].idSeccion
                }
                this.enviromentVariable.setSection({
                  descripcion: data[0].descripcion,
                  titulo: data[0].titulo,
                  imagen: data[0].imagen,
                  imagenMenu: data[0].imagenMenu,
                  nombre: data[0].nombre,
                  nombre_es: data[0].nombre_es,
                  orden: data[0].orden,
                  idSeccion: data[0].idSeccion,
                  publicada: data[0].publicada
                })
              }
              if (param.query) {
                this.query = param.query
                this.highlight()
              }

              this.metaService.setTitle(this.collection.titulo);
              this.metaService.addTags([
                { name: 'og:description', content: this.collection.descripcion },
                { name: 'og:robots', content: 'index, follow' },
                { name: 'description', content: this.collection.descripcion },
                { name: 'robots', content: 'index, follow' },
                { name: 'keywords', content: this.collection.titulo },
                { name: 'og:keywords', content: this.collection.titulo },
                { name: 'og:url', content: 'http://cubamuseo.net' + this.router.url },

              ])
              this.initBreadcrumb()
              this.initGalery()
            }, err => {

            }
          )
      }
    )
  }

  highlight() {
    setTimeout(() => {
      let el = document.getElementById('text-desc')
      let id = 0;
      el.childNodes.forEach(element => {
        let e = element as HTMLElement
        if (e.innerText) {
          let html = e.innerHTML
          let i = html.indexOf(this.query)
          if(i>1){
            html = html.substring(0, i) + "<mark  id='"+id+"' class='my-mark'>" + html.substring(i, i + this.query.length) + "</mark>" + html.substring(i + this.query.length);
            e.innerHTML = html;
          }

        }

      });
      document.getElementById('0').scrollIntoView();
    }, 200);

  }

  initSections() {
    this.collectionService.getCollectionsSections().subscribe(
      (data: any[]) => {
        this.enviromentVariable.sections = [];
        this.enviromentVariable.sections = data;
        this.enviromentVariable.link = { path: '/superior-collection' }
      }, err => {
        console.log(err)
      }
    )
  }

  initGalery() {
    this.gallery = [];
    this.galleryXX = [];
    this.collectionService.getSectionCategory(this.collection.id).subscribe(
      (data: any[]) => {
        data.forEach(element => {
          if (element.sigloXIX.data[0] == 1) {
            this.gallery.push(element)
          } else {
            this.galleryXX.push(element)
          }
        });
      }, err => {
      }
    )
  }

  getSection() {
    let data: any = this.enviromentVariable.getSection()
    if (data == 0) {
      return 0
    } else {
      if (this.enviromentVariable.getLanguage() === 'es') {
       
        return JSON.parse(data).nombre
      } else {

        return JSON.parse(data).nombre_es
      }
    }

  }

  setBreadcrumb(item) {
    this.enviromentVariable.breadcrumbList[2] = {
      name: item.nombre,
      path: '/inferior-collection/' + item.idCategoria
    };
    this.enviromentVariable.setBreadcrumb(this.enviromentVariable.breadcrumbList);
  }

  initBreadcrumb() {
    let data: any = this.enviromentVariable.getSection();
    this.enviromentVariable.breadcrumbList[1] = {
      name: JSON.parse(data).nombre,
      path: '/superior-collection/' + JSON.parse(data).idSeccion
    };
    this.enviromentVariable.breadcrumbList.splice(2, 1);
    this.enviromentVariable.setBreadcrumb(this.enviromentVariable.breadcrumbList);
  }

  ngOnInit(): void {
    this.enviromentVariable.actualPage = 'collection';

  }

  getCollectionName() {
    if (this.collection.nombre_es)
      return this.collection.nombre_es;
    else
      return this.collection.nombre
  }

}
