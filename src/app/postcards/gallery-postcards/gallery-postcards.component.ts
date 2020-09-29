import { Component, OnInit } from '@angular/core';
import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { ActivatedRoute } from '@angular/router';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { VpostServiceService } from 'src/app/core/service/vpost-service.service';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-gallery-postcards',
  templateUrl: './gallery-postcards.component.html',
  styleUrls: ['./gallery-postcards.component.css']
})
export class GalleryPostcardsComponent implements OnInit {

  gallery: any[];
  actualItem: any;
  section:any;

  constructor(
    public config: ConfigServiceService,
    private activateRoute: ActivatedRoute,
    public enviromentVariable: EnviromentVariableServiceService,
    private postalService: VpostServiceService,
    private modalService: ModalService
  ) {
    this.actualItem = {
      imagen: '',
    }
    this.gallery = [];
    activateRoute.params.subscribe(
      data => {
        if (data.id) {
          this.initGallery(data.id)
          this.section = JSON.parse(window.localStorage.getItem('section'));
          
        }
      }
    )
  }

  initGallery(id: number) {
    this.postalService.getVposts(id).subscribe(
      (data: any) => {
        this.gallery = data;

      }, err => {

      }
    )
  }

  initSections() {
    this.postalService.getVpostCategories().subscribe(
      (data: any[]) => {
        this.enviromentVariable.sections = data;
        this.enviromentVariable.link = { path: '/gallery-postcards' }
      }, err => {
        console.log(err)
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

  next() {
    for (let i = 0; i < this.gallery.length; i++) {
      const element = this.gallery[i];
      if (element.idPostal == this.actualItem.idPostal) {
        if (i + 1 < this.gallery.length){
          this.actualItem = this.gallery[i + 1];
        }        
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
      if (element.idPostal == this.actualItem.idPostal) {
        if (i > 0) {
          this.actualItem = this.gallery[i - 1];
        }
        else {
          this.actualItem = this.gallery[this.gallery.length - 1]
        }
        break;
      }
    }
  }

  closeModal(id: string) {
    if (!this.modalService.widht)
      this.modalService.widht = '900px';
    this.modalService.close(id);
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

  ngOnInit(): void {
    this.enviromentVariable.actualPage = 'postcards';
    this.initSections()
  }

}
