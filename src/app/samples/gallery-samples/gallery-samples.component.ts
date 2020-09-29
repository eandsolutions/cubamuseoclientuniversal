import { Component, OnInit } from '@angular/core';
import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { ActivatedRoute } from '@angular/router';
import { SamplesServiceService } from 'src/app/core/service/samples-service.service';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';

@Component({
  selector: 'app-gallery-samples',
  templateUrl: './gallery-samples.component.html',
  styleUrls: ['./gallery-samples.component.css']
})
export class GallerySamplesComponent implements OnInit {

  gallery:any[];
  id:number;
  section:any;

  constructor(
    public config: ConfigServiceService,
    private activateRoute: ActivatedRoute,
    private samplesService: SamplesServiceService,
    public enviromentVariable: EnviromentVariableServiceService,
    ) { 
    this.gallery = [];
    activateRoute.params.subscribe(
      data=>{
        if(data.id){
          this.id = data.id;
          this.initGallery(data.id)
          this.section = JSON.parse(window.localStorage.getItem('section'));
        }
      }
      
    )
  }

  initGallery(id:number){
    if(id==0){
      this.samplesService.getAllSamples().subscribe(
        (data:any)=>{
          this.gallery = data;
        },err=>{
  
        }
      )
    }
    else{
      this.samplesService.getSamplesCategory(id).subscribe(
        (data:any)=>{
          this.gallery = data;
        },err=>{
  
        }
      )
    }

    
  }

  initBreadcrumb(){
    let data:any = this.enviromentVariable.getSection();
    this.enviromentVariable.breadcrumbList[1]={
      name:'Muestras',
      path:'/samples'
    };
    
    this.enviromentVariable.breadcrumbList[2]={
      name: JSON.parse(data).nombre,
      path:'/gallery-samples/'+  JSON.parse(data).idCategoriaEstampa
    };
    this.enviromentVariable.setBreadcrumb(this.enviromentVariable.breadcrumbList);
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

  setBreadcrumb(item){
    this.enviromentVariable.breadcrumbList[3]={
      name:item.nombre,
      path:'/inferior-samples/'+ item.idMuestra
    };
    this.enviromentVariable.setBreadcrumb(this.enviromentVariable.breadcrumbList);
  }
  
  ngOnInit(): void {
    this.enviromentVariable.actualPage = 'samples';
    this.initBreadcrumb();
    this.enviromentVariable.breadcrumbList.splice(3,1);
    this.enviromentVariable.setBreadcrumb(this.enviromentVariable.breadcrumbList);
    this.enviromentVariable.sections=[];
    this.enviromentVariable.sections.push({
      idCategoriaEstampa:0,
      nombre:'Todas',
      imagenMenu:'todas.jpg',
      descripcion:'',
      publicada:1,
      orden:''


    });
    this.initSections();
  }

}
