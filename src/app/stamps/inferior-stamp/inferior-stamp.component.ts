import { Component, OnInit } from '@angular/core';
import { ConfigServiceService } from 'src/app/core/service/config-service.service';
import { ActivatedRoute } from '@angular/router';
import { SamplesServiceService } from 'src/app/core/service/samples-service.service';
import { EnviromentVariableServiceService } from 'src/app/core/service/enviroment-variable-service.service';
import { ModalService } from 'src/app/_modal';
import { TalesServiceService } from 'src/app/core/service/tales-service.service';

@Component({
  selector: 'app-inferior-stamp',
  templateUrl: './inferior-stamp.component.html',
  styleUrls: ['./inferior-stamp.component.css']
})
export class InferiorStampComponent implements OnInit {

  stamp: any;
  constructor(
    public config: ConfigServiceService,
    private activateRoute: ActivatedRoute,
    private samplesService: SamplesServiceService,
    public enviromentVariable: EnviromentVariableServiceService,
    private modalService: ModalService,
    private stampService: TalesServiceService
  ) {
    this.stamp = {
      descripcion: '',
      titulo: '',
      nombre: '',
      carpeta: '',
      id: 0
    }

    activateRoute.params.subscribe(
      data => {
        if (data.id)
          this.stampService.getTaleById(data.id).subscribe(
            (data: any) => {
              this.stamp = {
                descripcion: data.texto,
                titulo: data.titulo,
                nombre: data.nombre,
                carpeta: data.carpeta,
                id: data.idEstampa
              }
            }, err => {

            }
          )
      }
    )

  }

  initSections() {
    this.samplesService.getSamplesCategories().subscribe(
      (data: any[]) => {
        data.forEach(element => {
          this.enviromentVariable.sections.push(element);
        });
        this.enviromentVariable.link = { path: '/gallery-stamp' }
      }, err => {
        console.log(err)
      }
    )
  }

  ngOnInit(): void {
    this.enviromentVariable.actualPage = 'stamps';
    this.enviromentVariable.sections=[];
    this.enviromentVariable.sections.push({
      idCategoriaEstampa:0,
      nombre:'Todas',
      imagenMenu:'todas.jpg',
      descripcion:'',
      publicada:1,
      orden:''


    });
    this.initSections();
  }



}
