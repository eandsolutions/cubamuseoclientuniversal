import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(public http: HttpClient, private config: ConfigServiceService) { }

  sendEmail(data) {
    return this.http.post(this.config.serverNodeLocation + 'mail', {data});
  }
}
