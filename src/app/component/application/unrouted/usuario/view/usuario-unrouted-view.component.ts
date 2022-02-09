import { Component, Input,OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-unrouted-view',
  templateUrl: './usuario-unrouted-view.component.html',
  styleUrls: ['./usuario-unrouted-view.component.css']
})
export class usuariounroutedViewComponent implements OnInit {

  @Input() id: number = null;  
  
  oUsuario: IUsuario;
  oUsuarioSession: IUsuario;
  winRate:number;

  strEntity: string = "usuario"
  strOperation: string = "view"
  strTitleSingular:string= "usuario"

  constructor(
    private oUsuarioService: UsuarioService,
    private activatedroute: ActivatedRoute
    //public oIconService: IconService
  ) {
    
  }

  ngOnInit(): void {
    this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));
    this.getOne();
  }

  getOne = () => {
    this.oUsuarioService
      .getOne(this.id)
      .subscribe((oData: IUsuario) => {
        this.oUsuario = oData;
        this.getWinRate();
      });
  };
  getWinRate=()=>{
    this.winRate=this.oUsuario.wins*100/(this.oUsuario.wins+this.oUsuario.losses);
    console.log(this.winRate);
  }

}
