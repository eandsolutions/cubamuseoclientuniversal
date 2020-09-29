import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionServiceService {
  collectionList: any;
  collectionCategoryList: any;
  collectionPagesList: any;
  lang:any;

  constructor(
    public http: HttpClient, 
    private config: ConfigServiceService,
    public enviromentVariable: EnviromentVariableServiceService) {
    this.collectionList = [];
    this.collectionCategoryList = [];
    this.collectionPagesList = [];
    this.lang= enviromentVariable.getLanguage();
   }
   //Texto e imagen de inicio de las colecciones
   getCollectionText(id) {
    return this.http.get(this.config.serverNodeLocation + 'text/'  + this.lang +'/' + id);
  }

  getCategoryById(id) {
     return this.http.get(this.config.serverNodeLocation + 'category/' + this.lang +'/' + id);
   }

   getSectionById(id){
    return this.http.get(this.config.serverNodeLocation + 'section/' + this.lang +'/' + id);
   }


   getItem(id){
    return this.http.get(this.config.serverNodeLocation + 'item/' + id);
   }


   getCollectionItemByCategory(id) {
     return this.http.get(this.config.serverNodeLocation + 'category-item/byCategory/' + this.lang +'/' + id);
   }


  getSectionByCategory(id){
    return this.http.get(this.config.serverNodeLocation + 'section-category/byCategory/' + id);
   }


  getSectionCategory(id){
    return this.http.get(this.config.serverNodeLocation + 'section-category/bySection/' + this.lang +'/' + id);
  }
  
  getCollectionsSections() {
    return this.http.get(this.config.serverNodeLocation + 'section/' + this.lang);
  }
}
