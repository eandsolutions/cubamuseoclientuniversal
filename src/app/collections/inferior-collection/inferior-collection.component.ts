import { Component, OnInit } from '@angular/core';
import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { ActivatedRoute } from '@angular/router';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { CollectionServiceService } from 'src/app/core/service/collection-service.service';
import { ModalService } from 'src/app/_modal/modal.service';
import { decode } from 'punycode';

@Component({
  selector: 'app-inferior-collection',
  templateUrl: './inferior-collection.component.html',
  styleUrls: ['./inferior-collection.component.scss']
})
export class InferiorCollectionComponent implements OnInit {

  collection: any;
  gallery: any[];
  actualItem: any;
  isHide: boolean;
  widht: string = '900px'
  maxheigth: number;
  id:number;

  constructor(
    public config: ConfigServiceService,
    private activateRoute: ActivatedRoute,
    public enviromentVariable: EnviromentVariableServiceService,
    private collectionService: CollectionServiceService,
    private modalService: ModalService
  ) {
        this.isHide = false;
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

  initCollection(id:number){
    this.collectionService.getCategoryById(id).subscribe(
      (data: any) => {
        if(data.nombre){
          this.collection = {
            descripcion: data.descripcion,
            titulo: data.titulo,
            imagen: data.imagen,
            nombre: data.nombre,
            carpeta: data.carpeta,
            id: data.idCategoria,
            cantImages: data.cantImagenesFila
          }
        }else{
          this.collection = {
            descripcion: data[0].descripcion,
            titulo: data[0].titulo,
            imagen: data[0].imagen,
            nombre: data[0].nombre,
            carpeta: data[0].carpeta,
            id: data[0].idCategoria,
            cantImages: data[0].cantImagenesFila
          }
        }
      
    
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

    this.collectionService.getCollectionsSections().subscribe(
      (data: any[]) => {
        this.enviromentVariable.sections = [];
        this.enviromentVariable.sections = data;
        this.enviromentVariable.link = { path: '/superior-collection' }
      }, err => {
        
      }
    )
  }

  ngOnInit(): void {
    this.enviromentVariable.actualPage = 'collection'
    this.initCollection(this.id)
    this.initSections()
    
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

  getHeigth(){
    let value = document.getElementById('item').offsetWidth;
    return value-10;
  }

}
