import { Component, OnInit } from '@angular/core';
import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  actualIdItem: any;
  isHide: boolean;
  isHideTitle: boolean;
  widht: string = '900px'
  maxheigth: number;
  id: number;
  galleryActive:boolean = false;

  constructor(
    public config: ConfigServiceService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    public enviromentVariable: EnviromentVariableServiceService,
    private collectionService: CollectionServiceService,
    private modalService: ModalService,
    private metaService: MetaService
  ) {
    this.isHide = false;
    this.isHideTitle = false;
    this.gallery = [];
    this.maxheigth = 0;
    this.actualIdItem = -1;
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
          if(data.item){
            this.galleryActive = true;
            this.actualIdItem = data.item
            
          }
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
            nombre: data.imagen.replace(".jpg",""),
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
            nombre: data.imagen.replace(".jpg",""),
            carpeta: data[0].carpeta,
            id: data[0].idCategoria,
            cantImages: data[0].cantImagenesFila
          }
          this.enviromentVariable.setSection({
            descripcion: data[0].descripcion,
            titulo: data[0].titulo,
            imagen: data[0].imagen,
            imagenMenu: data[0].imagenMenu,
            nombre: data.imagen.replace(".jpg",""),
            nombre_es: data.imagen.replace(".jpg",""),
            orden: data[0].orden,
            idSeccion: data[0].idSeccion,
            publicada: data[0].publicada
          })
        }

        this.metaService.setTitle(this.collection.titulo);
        this.metaService.addTags([
          { name: 'description', content: this.collection.descripcion },
          { name: 'robots', content: 'index, follow' },
          { name: 'og:description', content: this.collection.descripcion },
          { name: 'og:robots', content: 'index, follow' },
          { name: 'keywords', content: this.collection.titulo },
          { name: 'og:keywords', content: this.collection.titulo },
          { name: 'og:url', content: 'http://cubamuseo.net' + this.router.url },
        ])
        this.initGalery()
      }, err => {

      }
    )
  }

  initGalery() {
    this.collectionService.getCollectionItemByCategory(this.collection.id).subscribe(
      (data: any[]) => {
        let result = [];
        var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

        /* if(isNaN(+data[0].imagen)){
          var mapped = data.map(function(el, i) {
            return { index: i, value: el.imagen.toLowerCase().replace(" ","") };
          })
          console.log("entro mal")
          // sorting the mapped array containing the reduced values
          mapped.sort(function(a, b) {
            if (a.value > b.value) {
              return 1;
            }
            if (a.value < b.value) {
              return -1;
            }
            return 0;
          });
  
          result = mapped.map(function(el){
            return data[el.index];
          });
        }else{
          result = data.sort();
        } */
        
        
        this.gallery = data
        
        if(this.actualIdItem != -1){
          for (let i = 0; i < this.gallery.length; i++) {
            const element = this.gallery[i];
            if(element.idItem == this.actualIdItem){
              this.actualItem = element;
              this.openModal('custom-modal-1', this.actualItem);
              break;
            }
          }
        }

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
      this.router.navigate(['inferior-collection',this.id, actual.idItem])
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

  checkLenghtTitle(title: string) {
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
