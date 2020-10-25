import { EnviromentVariableServiceService } from './enviroment-variable-service.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigServiceService } from './config-service.service';


@Injectable({
  providedIn: 'root'
})
export class RelatedSitesServiceService {

  sites: any[];
  lang: any;

  constructor(public http: HttpClient,public enviromentVariable: EnviromentVariableServiceService,  private config: ConfigServiceService) {
    this.sites = [];
    this.lang = enviromentVariable.getLanguage();
   }

   getSiteById(id) {
    return this.http.get(this.config.serverNodeLocation + 'related-sites/' + id);
  }


  getAllSites(){
    return this.http.get(this.config.serverNodeLocation + 'related-sites/' + this.lang);
  }
}
