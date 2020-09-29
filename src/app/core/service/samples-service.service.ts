import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class SamplesServiceService {
  samplesList: any;
  samplesCategoryList: any;
  samplesGalleryList: any;

  constructor(public http: HttpClient, private config: ConfigServiceService) {
    this.samplesCategoryList = [];
    this.samplesGalleryList = [];
    this.samplesList = [];
   }
   getSamplesHome(id) {
    return this.http.get(this.config.serverNodeLocation + 'api/sample/getHome/' + id);
  }
   getSampleById(id) {
    return this.http.get(this.config.serverNodeLocation + 'model/' + id);
  }

  getItem(id){
    return this.http.get(this.config.serverNodeLocation + 'api/sample/getItem/' + id);
   }

   getImage(id){
    return this.http.get(this.config.serverNodeLocation + 'api/sample/getItemImage/' + id);
   }

  getSamplesCategory(id) {
    return this.http.get(this.config.serverNodeLocation + 'clasification-model/byCategory/'+id);
  }

  getSamplesGalleryById(id) {
   return this.http.get(this.config.serverNodeLocation + 'api/sample/getOneGallery/' + id);
 }

 getSamplesGalleries(id) {
   return this.http.get(this.config.serverNodeLocation + 'model-item/byModelId/' + id);
 }

 getSamplesCategoryById(id) {
   return this.http.get(this.config.serverNodeLocation + 'api/sample/getOneCategory/' + id);
 }

 getSamplesCategories() {
   return this.http.get(this.config.serverNodeLocation + 'category-stamp');
 }

 getAllSamples() {
  return this.http.get(this.config.serverNodeLocation + 'model/');
}
}
