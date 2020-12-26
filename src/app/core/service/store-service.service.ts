import { ConfigServiceService } from './config-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreServiceService {
  adList: any;
  storeCategoryList: any;

  constructor(public http: HttpClient, private config: ConfigServiceService) {
    this.storeCategoryList = [];
    this.adList = [];
   }

   getStoreHome(id) {
    return this.http.get(this.config.serverNodeLocation + 'api/store/getHome/' + id);
  }

   getAdById(id) {
    return this.http.get(this.config.serverNodeLocation + 'shop-item/' + id);
  }

  getAdsByTematic(id) {
    return this.http.get(this.config.serverNodeLocation + 'shop-tematics-item/byTematic/'+ id );
  }

   getAdCategoryById(id) {
    return this.http.get(this.config.serverNodeLocation + 'api/store/getOneCategory/' + id);
  }

  getStoreCategories() {
    return this.http.get(this.config.serverNodeLocation + 'shop-tematics');
  }
}
