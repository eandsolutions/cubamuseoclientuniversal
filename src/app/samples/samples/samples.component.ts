import { Component, OnInit } from '@angular/core';
import { CollectionServiceService } from 'src/app/core/service/collection-service.service';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { SamplesServiceService } from 'src/app/core/service/samples-service.service';
import { MetaService } from 'src/app/core/service/meta.service';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.css']
})
export class SamplesComponent implements OnInit {

  homeData: any;
  allSamples: any[];
  constructor(
    private collectionService: CollectionServiceService,
    public enviromentVariable: EnviromentVariableServiceService,
    public config: ConfigServiceService,
    private samplesService: SamplesServiceService,
    private metaService: MetaService
    ) { 
    this.allSamples=[];
    this.homeData = {
      titulo: '',
      descripcion: '',
      imagen: ''
    }
    
    this.enviromentVariable.deleteSection();
    this.initAllSamples();
  }

  initAllSamples(){
    this.samplesService.getAllSamples().subscribe(
      (data:any)=>{
        this.allSamples = data;
      },err=>{

      }
    )
      
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

  initComponent() {
    this.collectionService.getCollectionText(3).subscribe(
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
        this.metaService.setTitle(this.homeData.nombre)
        this.metaService.addTags([
          { name: 'og:description', content: this.homeData.descripcion.slice(0,500) },
          { name: 'og:robots', content: 'index, follow' }
        ])
      }, err => {

      }
    )
  }
  initBreadcrumb(){
    let data:any = this.enviromentVariable.getSection();
    this.enviromentVariable.breadcrumbList[1]={
      name:'Muestras',
      path:'/samples'
    };
    this.enviromentVariable.breadcrumbList.splice(2,2);
    this.enviromentVariable.setBreadcrumb(this.enviromentVariable.breadcrumbList);
  }

  ngOnInit(): void {
    this.enviromentVariable.actualPage = 'samples'
    this.initBreadcrumb();
    this.enviromentVariable.sections=[];
    this.enviromentVariable.sections.push({
      idCategoriaEstampa:0,
      nombre:'Todas las páginas de la sección',
      imagenMenu:'todas.jpg',
      descripcion:'',
      publicada:1,
      orden:''
    });
    this.initSections();
    this.initComponent();
  }

}
