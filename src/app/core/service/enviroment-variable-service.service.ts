import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigServiceService } from './config-service.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EnviromentVariableServiceService {

  sections: any[];
  breadcrumbList:any[];
  lang:any;
  news: any;
  link: any;
  actualPage: string;
  googlePlus: string = '';
  Twitter: string = 'http://twitter.com/share?text=[TITLE]&url=[URL]';

  constructor(
    public http: HttpClient, 
    private config: ConfigServiceService,
    private localStorage: LocalStorageService) {
    this.sections = [];
    this.link = { path: '' };
    this.actualPage = 'collection';
    this.breadcrumbList =[];
    this.breadcrumbList[0]={
        name:'Inicio',
        path:'/home'
    };   
    if(!this.getLanguage())
      this.setLanguage('es');
  }

  setSections(sections: any[]) {
    this.sections = sections;
  }

  /*   setCategory(category: string) {
      this.localStorage.setItem('category', category);
    } */

  getFacebook(url) {
    return 'http://www.facebook.com/sharer.php?u=' + url
  }

  getGooglePlus(url: string) {
    return 'https://plus.google.com/share?url=' + url;
  }

  getTwitter(title, url) {
    return 'http://twitter.com/share?text=' + title + '&url=' + url
  }

  getLinkedIn(url) {
    return 'http://www.linkedin.com/shareArticle?mini=true&url=' + url
  }

  getPinterest(url, media) {
    return 'http://pinterest.com/pin/create/button/?url=' + url + '&media=' + media
  }

  getMail(subject, body) {
    return 'mailto:?subject=' + subject + '&body=' + body
  }

  setBreadcrumb(breadcrumb: any[]) {
    this.localStorage.setItem('breadcrumb', JSON.stringify(breadcrumb));
  }


  getBreadcrumb() {
    if (this.localStorage.getItem('breadcrumb'))
      return this.localStorage.getItem('breadcrumb') ;
    return 0
  }

  deleteBreadcrumb() {
    this.localStorage.removeItem('breadcrumb');
  }

  setSection(section: any) {
    this.localStorage.setItem('section', JSON.stringify(section));
  }


  getSection() {
    if (this.localStorage.getItem('section'))
      return this.localStorage.getItem('section');
    return 0
  }

  sendMail(data: any) {
    return this.http.post(this.config.serverNodeLocation + 'mail', data)
  }

  deleteSection() {
    this.localStorage.removeItem('section');
  }

  setLanguage(lang:any){
    this.localStorage.setItem('lang', JSON.stringify(lang));
  }
  getLanguage() {
    if (this.localStorage.getItem('lang'))
      return JSON.parse(this.localStorage.getItem('lang'));
    return 0
  }
  setNew(news:any){
    this.localStorage.setItem('news', JSON.stringify(news));
  }
  getNew() {
    if (this.localStorage.getItem('news'))
      return JSON.parse(this.localStorage.getItem('news'));
    return 0
  }

  /* setLevel(fatherLevel, father, section) {

    if (section === 'vpost' || section === 'tales' || section === 'store') {
      if (father === 'category') {
        this.localStorage.setItem('level', '2');
      }
      else {
        this.localStorage.setItem('level', '1');
      }
    }
    if (section === 'collection' || section === 'samples') {
      if (father === 'category') {
        this.localStorage.setItem('level', '3');
      }
      else if (father === 'text' && fatherLevel === 3) {
        this.localStorage.setItem('level', '2');
      }
      else if (father === 'gallery' && fatherLevel === 3) {
        this.localStorage.setItem('level', '2');
      }
      else {
        this.localStorage.setItem('level', '2');
      }

    }
  } */
}
