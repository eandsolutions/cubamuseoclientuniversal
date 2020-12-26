import { Component, OnInit } from '@angular/core';
import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { ActivatedRoute } from '@angular/router';
import { TalesServiceService } from 'src/app/core/service/tales-service.service';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { SamplesServiceService } from 'src/app/core/service/samples-service.service';
import { StoreServiceService } from 'src/app/core/service/store-service.service';

@Component({
  selector: 'app-gallery-store',
  templateUrl: './gallery-store.component.html',
  styleUrls: ['./gallery-store.component.css']
})
export class GalleryStoreComponent implements OnInit {

  gallery:any[];
  id:number;
  constructor(
    public config: ConfigServiceService,
    private activateRoute: ActivatedRoute,
    private talesService: TalesServiceService,
    private samplesService: SamplesServiceService,
    private storeService: StoreServiceService,
    public enviromentVariable: EnviromentVariableServiceService,
    ) { 
    this.gallery = [];
    activateRoute.params.subscribe(
      data=>{
        if(data.id){
          this.id = data.id;
          this.initGallery(data.id)
        }
      }
    )
  }

  initGallery(id:number){
    this.storeService.getAdsByTematic(id).subscribe(
      (data:any)=>{
        this.gallery = data;
      },err=>{

      }
    )
  }

  initSections() {
    this.storeService.getStoreCategories().subscribe(
      (data: any[]) => {
        this.enviromentVariable.sections = data;
        this.enviromentVariable.link = { path: '/gallery-store' }
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

  ngOnInit(): void {
    this.enviromentVariable.actualPage = 'store';
    this.initSections();
  }

}
