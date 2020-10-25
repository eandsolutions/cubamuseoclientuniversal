import { ConfigServiceService } from './config-service.service';
import { EnviromentVariableServiceService } from './enviroment-variable-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsServiceService {
  news: any[];
  lang: any;

  constructor(public http: HttpClient,
    public enviromentVariable: EnviromentVariableServiceService,
    private config: ConfigServiceService) {
    this.news = [];
    this.lang = enviromentVariable.getLanguage();
  }

  getNewsById(id) {
    return this.http.get(this.config.serverNodeLocation + 'news/' + id);
  }


  getAllNews() {
    return this.http.get(this.config.serverNodeLocation + 'news');
  }
}

