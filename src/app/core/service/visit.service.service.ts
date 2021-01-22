import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class VisitServiceService {
  visit:any

  constructor(
    public http: HttpClient, 
    private config: ConfigServiceService
  ) {
    this.visit = 0;
   }

   getOne() {
    return this.http.get(this.config.serverNodeLocation + 'visit');
  }

  create(visit:any ){
    return this.http.post(this.config.serverNodeLocation + 'visit', visit)
  }

  update(id: string, visit:any) {
    return this.http.put(this.config.serverNodeLocation + 'visit/' + id, visit);
  }


}
