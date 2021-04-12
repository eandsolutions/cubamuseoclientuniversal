import { Component, OnInit } from '@angular/core';
import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SamplesServiceService } from 'src/app/core/service/samples-service.service';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { ModalService } from 'src/app/_modal';
import { MetaService } from 'src/app/core/service/meta.service';

@Component({
  selector: 'app-inferior-samples',
  templateUrl: './inferior-samples.component.html',
  styleUrls: ['./inferior-samples.component.css']
})
export class InferiorSamplesComponent implements OnInit {

  samples: any;
  gallery: any[];
  actualItem: any;
  isHide: boolean;
  widht: string = '900px'
  constructor(
    public config: ConfigServiceService,
    private activateRoute: ActivatedRoute,
    private samplesService: SamplesServiceService,
    public enviromentVariable: EnviromentVariableServiceService,
    private modalService: ModalService,
    private metaService: MetaService,
    private router: Router,
  ) {
    this.isHide = false;
    this.gallery = [];
    this.actualItem = {
      imagen: '',
      descripcion: '',
      emision: '',
      color: '',
      material: '',
      impresion: '',
      dimension: '',
      procedencia: '',
      precio: ''
    }
    this.samples = {
      descripcion: '',
      titulo: '',
      imagen: '',
      nombre: '',
      carpeta: '',
      id: '',
      cantImges: 0
    }
    activateRoute.params.subscribe(
      data => {
        if (data.id)
          this.samplesService.getSampleById(data.id).subscribe(
            (data: any) => {
              if (data.nombre){
                this.samples = {
                  descripcion: data.descripcion,
                  titulo: data.titulo,
                  imagen: data.imagen,
                  nombre: data.nombre,
                  carpeta: data.carpeta,
                  id: data.idMuestra,
                  cantImages: data.cantImagenes
                }
              }else{
                this.samples = {
                  descripcion: data[0].descripcion,
                  titulo: data[0].titulo,
                  imagen: data[0].imagen,
                  nombre: data[0].nombre,
                  nombre_es: data[0].nombre_es,
                  carpeta: data[0].carpeta,
                  id: data[0].idMuestra,
                  cantImages: data[0].cantImagenes
                }
              }

              this.metaService.setTitle(this.samples.titulo)
              this.metaService.addTags([
                { name: 'og:description', content: this.samples.descripcion.slice(0, 500) },
                { name: 'og:robots', content: 'index, follow' },
                { name: 'description', content: this.samples.descripcion.slice(0, 500) },
                { name: 'robots', content: 'index, follow' },
                { name: 'keywords', content: this.samples.titulo },
                { name: 'og:keywords', content: this.samples.titulo },
                { name: 'og:url', content: 'http://cubamuseo.net' + this.router.url },
              ])
              this.initGalery();
              this.enviromentVariable.actualPage = 'samples';
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
            }, err => {

            }
          )
      }
    )
  }

  ngOnInit(): void {

  }

  initSections() {
    this.samplesService.getSamplesCategories().subscribe(
      (data: any[]) => {
        data.forEach(element => {
          this.enviromentVariable.sections.push(element);
        });
        this.enviromentVariable.link = { path: '/gallery-samples' }
      }, err => {
        console.log(err)
      }
    )
  }

  initGalery() {
    this.samplesService.getSamplesGalleries(this.samples.id).subscribe(
      (data: any[]) => {
        this.gallery = data;
      }, err => {

      }
    )
  }

  openModal(id: string, actual: any) {
    if (actual) {
      this.actualItem = actual;
      this.modalService.widht = '900px'
    } else {
      this.modalService.widht = null
    }
    this.modalService.open(id);
  }

  next() {
    for (let i = 0; i < this.gallery.length; i++) {
      const element = this.gallery[i];
      if (element.idItem == this.actualItem.idItem) {
        if (i + 1 < this.gallery.length)
          this.actualItem = this.gallery[i + 1];
        else {
          this.actualItem = this.gallery[0]
        }
        break;
      }
    }
  }

  prev() {
    for (let i = 0; i < this.gallery.length; i++) {
      const element = this.gallery[i];
      if (element.idItem == this.actualItem.idItem) {
        if (i > 0)
          this.actualItem = this.gallery[i - 1];
        else {
          this.actualItem = this.gallery[this.gallery.length - 1]
        }
        break;
      }
    }
  }

  checkIfIsEmpty(elementToCheck: string) {
    let isEmpty: boolean;
    isEmpty = false;
    elementToCheck = elementToCheck.trim()
    if (elementToCheck.length == 0) {
      isEmpty = true;
    }
    return isEmpty;
  }

  closeModal(id: string) {
    if (!this.modalService.widht)
      this.modalService.widht = '900px';
    this.modalService.close(id);
  }

  checkLenght(elementToCheck: string) {
    let isLarge: boolean;
    isLarge = false;
    elementToCheck = elementToCheck.trim()
    if (elementToCheck.length > 500) {
      isLarge = true;
    }
    return isLarge;
  }

  sliceDescription(description: string) {
    let res = description.slice(0, 500) + " ...";
    return res;
  }

  see_more() {
    this.isHide = !this.isHide;
    return this.isHide;
  }

  getHeigth() {
    let value = document.getElementById('item').offsetWidth;
    return value - 10;
  }

}
