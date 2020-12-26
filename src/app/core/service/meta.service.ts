import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  
  constructor(private titleService: Title, private metaService: Meta) { }

  setTitle(title:string){
    this.titleService.setTitle(title)
  }

  addTags(tags:any[]){
    this.metaService.addTags(tags);
  }

}
