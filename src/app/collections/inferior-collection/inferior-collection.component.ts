import { Component, OnInit } from '@angular/core';
import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { ActivatedRoute } from '@angular/router';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { CollectionServiceService } from 'src/app/core/service/collection-service.service';
import { ModalService } from 'src/app/_modal/modal.service';
import { decode } from 'punycode';
import { MetaService } from 'src/app/core/service/meta.service';

@Component({
  selector: 'app-inferior-collection',
  templateUrl: './inferior-collection.component.html',
  styleUrls: ['./inferior-collection.component.scss']
})
export class InferiorCollectionComponent implements OnInit {

  collection: any;
  gallery: any[];
  prevSection: any;
  actualItem: any;
  isHide: boolean;
  isHideTitle:boolean;
  widht: string = '900px'
  maxheigth: number;
  id: number;

  constructor(
    public config: ConfigServiceService,
    private activateRoute: ActivatedRoute,
    public enviromentVariable: EnviromentVariableServiceService,
    private collectionService: CollectionServiceService,
    private modalService: ModalService,
    private metaService: MetaService
  ) {
    this.isHide = false;
    this.isHideTitle = false;
    this.gallery = [];
    this.maxheigth = 0;
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

    this.collection = {
      descripcion: '',
      titulo: '',
      imagen: '',
      nombre: '',
      carpeta: null,
      id: '',
      cantImages: 0
    }

    activateRoute.params.subscribe(
      data => {
        if (data.id)
          this.id = data.id;
      }
    )
  }

  initCollection(id: number) {
    this.collectionService.getCategoryById(id).subscribe(
      (data: any) => {
        if (data.nombre) {
          this.collection = {
            descripcion: data.descripcion,
            titulo: data.titulo,
            imagen: data.imagen,
            nombre: data.nombre,
            carpeta: data.carpeta,
            id: data.idCategoria,
            cantImages: data.cantImagenesFila
          }
          this.enviromentVariable.setSection(data)
        } else {
          this.collection = {
            descripcion: data[0].descripcion,
            titulo: data[0].titulo,
            imagen: data[0].imagen,
            nombre: data[0].nombre,
            carpeta: data[0].carpeta,
            id: data[0].idCategoria,
            cantImages: data[0].cantImagenesFila
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

        this.metaService.setTitle(this.collection.titulo);
        this.metaService.addTags([
          { name: 'description', content: this.collection.descripcion.slice(0, 500) },
          { name: 'robots', content: 'index, follow' }
        ])
        this.initGalery()
      }, err => {

      }
    )
  }

  initGalery() {
    this.collectionService.getCollectionItemByCategory(this.collection.id).subscribe(
      (data: any[]) => {
        this.gallery = data;
      }, err => {

      }
    )
  }

  initSections() {
    this.collectionService.getSectionByCategory(this.id).subscribe(
      (data) => {
        this.prevSection = data[0];
      }, err => {

      }
    )
    this.collectionService.getCollectionsSections().subscribe(
      (data: any[]) => {
        this.enviromentVariable.sections = [];
        this.enviromentVariable.sections = data;
        this.enviromentVariable.link = { path: '/superior-collection' }
      }, err => {

      }
    )
  }

  initBreadcrumb(data) {
    this.enviromentVariable.breadcrumbList[1] = {
      name: JSON.parse(data).nombre,
      path: '/inferior-collection/' + JSON.parse(data).idSeccion
    };
    this.enviromentVariable.breadcrumbList.splice(2, 1);
    this.enviromentVariable.setBreadcrumb(this.enviromentVariable.breadcrumbList);
  }

  ngOnInit(): void {
    this.enviromentVariable.actualPage = 'collection'
    this.initCollection(this.id)
    this.initSections()

  }

  getSection() {
    if (this.enviromentVariable.getLanguage() == 'en')
      return this.prevSection.nombre_es
    return this.prevSection.nombre
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
        break
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

  checkLenghtTitle(title: string){
    let isLarge: boolean;
    isLarge = false;
    title = title.trim()
    if (title.length > 200) {
      isLarge = true;
    }
    return isLarge;
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

  sliceTitle(title: string) {
    let res = title.slice(0, 200) + " ...";
    return res;
  }

  see_moreTitle() {
    this.isHideTitle = !this.isHideTitle;
    return this.isHideTitle;
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
