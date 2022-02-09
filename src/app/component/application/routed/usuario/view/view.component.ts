import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { IUsuario } from 'src/app/model/usuario-interfaces';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class usuarioroutedViewComponent implements OnInit {

  id: number;
  idequipo:number;
  strUsuarioSession: string;
  strEntity: string = "usuario"
  strOperation: string = "view"
  strTitleSingular:string= "usuario"
  oUsuarioSession:IUsuario

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oLocation: Location,
    //public oIconService: IconService

  ) {
    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.id = this.oActivatedRoute.snapshot.params.id;   
  }

  ngOnInit(): void {
    this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));

  }

  goBack() {
    this.oLocation.back();
  }
}
