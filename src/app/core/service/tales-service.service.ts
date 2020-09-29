import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class TalesServiceService {
  taleList: any;
  taleCategoryList: any;

  constructor(public http: HttpClient, private config: ConfigServiceService) {
    this.taleCategoryList = [];
    this.taleList = [];
  }

  getTalesHome(id) {
    return this.http.get(this.config.serverNodeLocation + 'api/tale/getHome/' + id);
  }

  getTaleById(id) {
    return this.http.get(this.config.serverNodeLocation + 'stamp/' + id);
  }

  getTales(offset, id) {
    return this.http.post(this.config.serverNodeLocation + 'api/tale/getWith', { id, offset });
  }

  getTaleCategoryById(id) {
    return this.http.get(this.config.serverNodeLocation + 'api/tale/getOneCategory/' + id);
  }

  getTalesCategories() {
    return this.http.get(this.config.serverNodeLocation + 'category-stamp');
  }

  getTalesByCategory(id) {
    return this.http.get(this.config.serverNodeLocation + 'clasification-stamp/byCategory/' + id);
  }

  getAllTales(){
    return this.http.get(this.config.serverNodeLocation + 'stamp/');
  }

}
