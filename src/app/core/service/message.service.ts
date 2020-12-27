import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(public http: HttpClient,
    private config: ConfigServiceService) {

     }

  sendMessage(body) {
    return this.http.post(this.config.serverNodeLocation + 'mail/send_vpost' , body);
    }
}
