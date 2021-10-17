import { Component, OnInit, ElementRef } from '@angular/core';
//import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '../../_modal';
import { ConfigServiceService } from '../../core/service/config-service.service';
import { RelatedSitesServiceService } from '../../core/service/related-sites-service.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    toogleButton: boolean;
    query: string;
    width: number;

    mail: any = {
        from: '',
        subject: '',
        text: '',
        name: ''
      }

      sites: any[];

    constructor(
        location: Location,
        private element: ElementRef,
        private router: Router,
        public enviromentVariable: EnviromentVariableServiceService,
        public translate: TranslateService,
        private modalService: ModalService,
        private enviromentVariableService: EnviromentVariableServiceService,
        public config: ConfigServiceService,
        private sitesService: RelatedSitesServiceService
    ) {
        this.location = location;
        this.toggleButton = false;
        this.sidebarVisible = false;
        this.query = '';
        this.sites = [];
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
      

    resize(){
        this.width = window.screen.width
    }

    change(language) {
        this.translate.use(language);
        this.enviromentVariable.setLanguage(language);
        window.location.reload();

    }
    ngOnInit() {
        this.initSites();
        //this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    search() {
        this.router.navigate(['search', this.query])
    }

    // getTitle(){
    //   var titlee = this.location.prepareExternalUrl(this.location.path());
    //   if(titlee.charAt(0) === '#'){
    //       titlee = titlee.slice( 1 );
    //   }

    //   for(var item = 0; item < this.listTitles.length; item++){
    //       if(this.listTitles[item].path === titlee){
    //           return this.listTitles[item].title;
    //       }
    //   }
    //   return 'Dashboard';
    // }

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
