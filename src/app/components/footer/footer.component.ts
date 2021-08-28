import { NewsServiceService } from './../../core/service/news-service.service';
import { ConfigServiceService } from './../../core/service/config-service.service';
import { RelatedSitesServiceService } from './../../core/service/related-sites-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/_modal';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { data } from 'jquery';
import { ToastContainerDirective } from 'ng-uikit-pro-standard';
import { ToastService } from 'ng-uikit-pro-standard';
import { element } from 'protractor';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css','./footer.component.scss']
})
export class FooterComponent implements OnInit {
  test: Date = new Date();
  new:any;
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;
  
  mail: any = {
    from: '',
    subject: '',
    text: '',
    name: ''
  }

  sites: any[];
  news: any[];
  mySlideImages=[
    '../../../assets/img/somos.png',
    '../../../assets/img/vendedor.png',
    '../../../assets/img/noticias.png',
    '../../../assets/img/relacionados.png'];
 
    mySlideOptions={
     items: 1, 
     dots: false, 
     autoplay:true,
     autoplayTimeout:2000,
     autoplayHoverPause:true,
     loop:true,
     responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    }
  };


  constructor( public toastrService: ToastService,
    private modalService: ModalService,
    private enviromentVariableService: EnviromentVariableServiceService,
    private sitesService: RelatedSitesServiceService,
    private newsService: NewsServiceService,
    public config: ConfigServiceService,
  ) {
    this.sites = [];
    this.news = [];
    this.new = {
      id:'',
      titulo: '',
      descripcion: '',
      imagen: ''
    }
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

  fixOwlCurrentIdx(event) {
    let current = (event.item.index + 1) - event.relatedTarget._clones.length / 2;
    let itemsCount = event.item.count;
  
    if (current > itemsCount || current == 0) {
      current = itemsCount - (current % itemsCount);
    }
    
    return current - 1;
  }

  initNews(){
    this.newsService.getAllNews().subscribe(
      (data: any[]) => {
        data.forEach(element => {
            this.news.push(element); 
        });
        this.processLink()
      }, err => {
        console.log(err)
      }
    )
  }

  processLink(){
    this.news.forEach(element=>{
      element.descripcion = element.descripcion.replace('<a','<a target="_blank"')
    })
    console.log(this.news)
  }

  initInfo() {
    this.newsService.getLastNew().subscribe(
      (news_s: any) => {
        if(news_s[0]){          
          this.new = {
            id: news_s[0].id,
            titulo: news_s[0].titulo,
            descripcion: news_s[0].descripcion,
            imagen: news_s[0].imagen
          }
          //this.toastrService.info(this.new.titulo); 
          this.enviromentVariableService.setNew(this.new)    
        }
      }, err => {

      }
    )
  }

  checkIfLast(){
    let res = false;
    this.newsService.getLastNew().subscribe(
        (news_s: any) => {
          if(news_s[0]){
            let data: any = this.enviromentVariableService.getNew()
            if( data.id === news_s[0].id){
               res = true;  
            }
            else{
                this.new ={
                    id: news_s[0].id,
                    titulo: news_s[0].titulo,
                    descripcion: news_s[0].descripcion,
                    imagen: news_s[0].imagen
                  }
                this.enviromentVariableService.setNew(this.new)
                //this.toastrService.info(this.new.titulo); 
            }
          }
        }, err => { 
        }
      )  
    return res;
  }
  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
    this.initSites();
    this.initNews();
       let data: any = this.enviromentVariableService.getNew()
      if(!data)
      this.initInfo();
      else {
          this.checkIfLast();
      } 
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
