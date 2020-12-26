import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor(public http: HttpClient, private config: ConfigServiceService) {

  }

  findInText(query) {
    return this.http.get(this.config.serverNodeLocation + 'search/inText/' + query)
  }

  findInShop(query) {
    return this.http.get(this.config.serverNodeLocation + 'search/inShop/' + query)
  }

  findInModel(query) {
    return this.http.get(this.config.serverNodeLocation + 'search/inModel/' + query)
  }

  findInStamp(query) {
    return this.http.get(this.config.serverNodeLocation + 'search/inStamp/' + query)
  }

  findInCollectionsCategory(query) {
    return this.http.get(this.config.serverNodeLocation + 'search/inCollectionCategory/' + query)
  }

  findInCollectionsSection(query) {
    return this.http.get(this.config.serverNodeLocation + 'search/inCollectionSection/' + query)
  }
  
}
