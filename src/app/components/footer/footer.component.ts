import { NewsServiceService } from './../../core/service/news-service.service';
import { ConfigServiceService } from './../../core/service/config-service.service';
import { RelatedSitesServiceService } from './../../core/service/related-sites-service.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_modal';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { data } from 'jquery';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  test: Date = new Date();

  mail: any = {
    from: '',
    subject: '',
    text: '',
    name: ''
  }

  sites: any[];
  news: any[];

  constructor(
    private modalService: ModalService,
    private enviromentVariableService: EnviromentVariableServiceService,
    private sitesService: RelatedSitesServiceService,
    private newsService: NewsServiceService,
    public config: ConfigServiceService,
  ) {
    this.sites = [];
    this.news = [];
   }

  initSites(){
    this.sitesService.getAllSites().subscribe(
      (data: any[]) => {
        data.forEach(element => {
            this.sites.push(element); 
        });
        console.log(data);
      }, err => {
        console.log(err)
      }
    )
  }

  initNews(){
    this.newsService.getAllNews().subscribe(
      (data: any[]) => {
        data.forEach(element => {
            this.news.push(element); 
        });
        console.log(data);
      }, err => {
        console.log(err)
      }
    )
  }


  ngOnInit() {
    this.initSites();
    this.initNews();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    if (!this.modalService.widht)
      this.modalService.widht = '900px';
    this.modalService.close(id);
  }

  send() {
    this.enviromentVariableService.sendMail(this.mail).subscribe(
      data => {
        if (data)
          alert('Se ha enviado el correo exitosamente')
      }, err => {
        alert('Error al enviar el correo')
      }
    )
  }

}
