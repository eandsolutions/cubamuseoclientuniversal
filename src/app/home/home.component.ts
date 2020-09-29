import { Component, OnInit } from '@angular/core';
import { CollectionServiceService } from '../core/service/collection-service.service';
//import { EnviromentVariableServiceService } from '../core/service/enviroment-variable-service.service';
import { ConfigServiceService } from '../core/service/config-service.service';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
//import { environment } from 'environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeData: any;
  constructor(
    private collectionService: CollectionServiceService,
    public enviromentVariable: EnviromentVariableServiceService,
    public config: ConfigServiceService
  ) {
    this.homeData = {
      titulo: '',
      descripcion: '',
      imagen: ''
    }
    this.enviromentVariable.deleteSection();
  }

  initSections() {
    this.collectionService.getCollectionsSections().subscribe(
      (data: any[]) => {
        this.enviromentVariable.sections = data;
        this.enviromentVariable.link = { path: '/superior-collection' }
      }, err => {
        console.log(err)
      }
    )
  }

  initComponent() {
    this.collectionService.getCollectionText(1).subscribe(
      (data: any) => {
        if(data.nombre){
          this.homeData = {
            titulo: data.nombre,
            descripcion: data.descripcion,
            imagen: data.imagen
          }
        }else{
           this.homeData={
            titulo: data[0].nombre,
            descripcion: data[0].descripcion,
            imagen: data[0].imagen
           } 
        }
       
      }, err => {
      }
    )
  }

  initBreadcrumb(){
    this.enviromentVariable.breadcrumbList.splice(1,3);
    this.enviromentVariable.setBreadcrumb(this.enviromentVariable.breadcrumbList);
  }
  

  ngOnInit(): void {
    this.enviromentVariable.actualPage = 'collection'
    this.initBreadcrumb();
    this.initSections();
    this.initComponent();
  }

}
