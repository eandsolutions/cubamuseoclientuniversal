import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigServiceService } from './config-service.service';
import { EnviromentVariableServiceService } from './enviroment-variable-service.service';

@Injectable({
  providedIn: 'root'
})
export class SamplesServiceService {
  samplesList: any;
  samplesCategoryList: any;
  samplesGalleryList: any;
  lang: any;

  constructor(public http: HttpClient, 
    private config: ConfigServiceService,
    public enviromentVariable: EnviromentVariableServiceService) {
    this.samplesCategoryList = [];
    this.samplesGalleryList = [];
    this.samplesList = [];
    this.lang = enviromentVariable.getLanguage();
   }
   getSamplesHome(id) {
    return this.http.get(this.config.serverNodeLocation + 'api/sample/getHome/' + id);
  }
   getSampleById(id) {
    return this.http.get(this.config.serverNodeLocation + 'model/' + id + '/' + this.lang);
  }

  getItem(id){
    return this.http.get(this.config.serverNodeLocation + 'api/sample/getItem/' + id);
   }

   getImage(id){
    return this.http.get(this.config.serverNodeLocation + 'api/sample/getItemImage/' + id);
   }

  getSamplesCategory(id) {
    return this.http.get(this.config.serverNodeLocation + 'clasification-model/byCategory/'+id + '/' + this.lang);
  }

  getSamplesGalleryById(id) {
   return this.http.get(this.config.serverNodeLocation + 'category-stamp/' + id);
 }

 getSamplesGalleries(id) {
   return this.http.get(this.config.serverNodeLocation + 'model-item/byModelId/' + id + '/' + this.lang);
 }

 getSamplesCategoryById(id) {
   return this.http.get(this.config.serverNodeLocation + 'category-stamp/' + id );
 }

 getSamplesCategories() {
   return this.http.get(this.config.serverNodeLocation + 'category-stamp/byLang/'+ this.lang);
 }

 getAllSamples() {
  return this.http.get(this.config.serverNodeLocation + 'model/' + this.lang);
}
}
