import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEquipo } from 'src/app/model/equipo-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { EquipoService } from 'src/app/service/equipo.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-equipo-unrouted-view',
  templateUrl: './equipo-unrouted-view.component.html',
  styleUrls: ['./equipo-unrouted-view.component.css']
})
export class EquipoUnroutedViewComponent implements OnInit {
  
  @Input() idequipo: number = null;  
  
  oEquipo: IEquipo;
  oUsuarioSession: IUsuario;

  strEntity: string = "Equipo"
  strOperation: string = "view"
  strTitleSingular:string= "Equipo"
  strTitlePlural: string = 'equipos'

  constructor(
    private oUsuarioService: UsuarioService,
    private activatedroute: ActivatedRoute,
    private oEquipoService:EquipoService,
    private oActivatedRoute: ActivatedRoute
    //public oIconService: IconService
  ) {

  }
  ngOnInit(): void {
    this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));

    if(this.oActivatedRoute.snapshot.routeConfig.path=="usuario/view/:id"){
      console.log(this.oActivatedRoute.snapshot.routeConfig.path);
      this.getUser();
    }else{
      this.getOne();
    }
  }

  getUser =() => {
    this.oUsuarioService.getOne(this.idequipo).subscribe((oData1:IUsuario)=>{
      this.oEquipoService.getOne(oData1.equipo.id).subscribe((oData:IEquipo)=>{
        this.oEquipo=oData;
      });
    });
  }
  getOne = () => {
    this.oEquipoService
      .getOne(this.idequipo)
      .subscribe((oData: IEquipo) => {
        this.oEquipo = oData;
      });
  };
}
