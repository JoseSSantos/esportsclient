import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPartido } from 'src/app/model/partido-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { PartidoService } from 'src/app/service/partido.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-encuentro-unrouted-view',
  templateUrl: './encuentro-unrouted-view.component.html',
  styleUrls: ['./encuentro-unrouted-view.component.css']
})
export class EncuentroUnroutedViewComponent implements OnInit {

  @Input() id: number = null;  
  
  oPartido: IPartido;
  oUsuarioSession: IUsuario;

  strEntity: string = "Partido"
  strOperation: string = "view"
  strTitleSingular:string= "Partido"
  strTitlePlural: string = 'Partidos'

  constructor(
    private oUsuarioService: UsuarioService,
    private activatedroute: ActivatedRoute,
    private oPartidoService:PartidoService,
    private oActivatedRoute: ActivatedRoute
    //public oIconService: IconService
  ) {

  }
  ngOnInit(): void {
    this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));
    this.getOne();
  }

  getOne = () => {
    this.oPartidoService
      .getOne(this.id)
      .subscribe((oData: IPartido) => {
        this.oPartido = oData;
      });
  };
}