import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { ConfigServiceService } from 'src/app/core/service/config-service.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
// export const ROUTES: RouteInfo[] = [
//     { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
//     { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
//     { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
//     { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
//     { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
//     { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
//     { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
//     { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
// ];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css','./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    public enviromentVariables: EnviromentVariableServiceService,
    public config: ConfigServiceService,
    private router:Router
  ) { 
  }

  ngOnInit(): void {

  }

  setSection(section:any) {
    this.enviromentVariables.setSection(section);
  }

  setBreadcrumb(section){
    let data:any = this.enviromentVariables.getSection();

    if(this.enviromentVariables.actualPage == 'collection'){
      this.enviromentVariables.breadcrumbList[1]={
        name: JSON.parse(data).nombre,
        path: '/superior-collection/' + JSON.parse(data).idSeccion
      };  
    }
    else if(this.enviromentVariables.actualPage == 'samples'){
      this.enviromentVariables.breadcrumbList[2]={
        name: JSON.parse(data).nombre,
        path: '/gallery-samples/' + JSON.parse(data).idCategoriaEstampa
      };  
    }
    else if(this.enviromentVariables.actualPage == 'stamps'){
      this.enviromentVariables.breadcrumbList[2]={
        name:JSON.parse(data).nombre,
        path: '/gallery-stamp/' + JSON.parse(data).idCategoriaEstampa
      };  
    }
    else{
      this.enviromentVariables.breadcrumbList[2]={
        name: JSON.parse(data).nombre,
        path: '/gallery-postcards/' + JSON.parse(data).idCategoriaPostal
      };  
    }

   
    this.enviromentVariables.setBreadcrumb(this.enviromentVariables.breadcrumbList)
  }

  getSection(){
    let data:any = this.enviromentVariables.getSection()
    if(data == 0){
        return 0
    }
    return JSON.parse(data);
  }
  
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
