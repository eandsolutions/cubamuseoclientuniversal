import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigServiceService } from './config-service.service';
import { EnviromentVariableServiceService } from './enviroment-variable-service.service';

@Injectable({
  providedIn: 'root'
})
export class TalesServiceService {
  taleList: any;
  taleCategoryList: any;
  lang: any;

  constructor(public http: HttpClient,
     private config: ConfigServiceService,
     public enviromentVariable: EnviromentVariableServiceService) {
    this.taleCategoryList = [];
    this.taleList = [];
    this.lang = enviromentVariable.getLanguage();
  }

  getTaleById(id) {
    return this.http.get(this.config.serverNodeLocation + 'stamp/' + id);
  }


  getTaleCategoryById(id) {
    return this.http.get(this.config.serverNodeLocation + 'category-stamp/' + id);
  }

  getTalesCategories() {
    return this.http.get(this.config.serverNodeLocation + 'category-stamp');
  }

  getTalesByCategory(id) {
    return this.http.get(this.config.serverNodeLocation + 'clasification-stamp/byCategory/' + id + '/' + this.lang);
  }

  getAllTales(){
    return this.http.get(this.config.serverNodeLocation + 'stamp/');
  }

}
