import { Router } from '@angular/router';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
b_length :number;
  constructor(
    public enviromentVariables: EnviromentVariableServiceService,
    private router: Router
    ) {
this.b_length=0;

  }

  ngOnInit(): void {
    
  }

  

  getBreadcrumb(){
    let data:any = this.enviromentVariables.getBreadcrumb();
    if(data == 0){
        return 0
    }
    this.b_length= Object.keys(JSON.parse(data)).length;
    return JSON.parse(data);
    
  }

}
