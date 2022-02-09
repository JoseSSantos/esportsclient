import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { IPartido, IPartido2Send } from 'src/app/model/partido-interfaces';
import { PartidoService } from 'src/app/service/partido.service';
import { DateTimeService } from 'src/app/service/datetime.service';

declare let $: any;

@Component({
  selector: 'app-encuentro-routed-new',
  templateUrl: './encuentro-routed-new.component.html',
  styleUrls: ['./encuentro-routed-new.component.css']
})
export class EncuentroRoutedNewComponent implements OnInit {

  strEntity: string = 'partido';
  strOperation: string = 'new';
  strTitleSingular: string = 'partido';
  strTitlePlural: string = 'equipos';
  oPartido: IPartido2Send=null;
  id: number = null;
  oForm: FormGroup = null;
  strResult: string = null;
  oUserSession: IUsuario;

  get f() {
    return this.oForm.controls;
  }

  constructor(

    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    public oIconService: IconService,
    private oLocation: Location,
    private oPartidoService:PartidoService,
    
  ) {
    if (this.oActivatedRoute.snapshot.data.message) {
      const strUsuarioSession: string =
        this.oActivatedRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(strUsuarioSession));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.oForm = this.oFormBuilder.group({
      Equipo1: ['', [Validators.required]],
      Equipo2: ['', [Validators.required]],
      fecha: ["", [Validators.required]],
      
    });
    $('#fecha').datetimepicker({
      defaultDate: "+1w",
      numberOfMonths: 1,
      dateFormat: 'dd/mm/yy',
      timeFormat: 'hh:mm',
      showAnim: "fold",
      onClose: (dateText: string, inst: any) => {
        this.oForm.controls['fecha'].setValue(dateText);
        this.oForm.controls['fecha'].markAsDirty();
      }
    });
  }


  onSubmit(): void {
    
      if (this.oForm) {
        this.oPartido = {
          id:null,
          equipo1:{
            id:this.oForm.value.Equipo1
          },
          equipo2:{
            id:this.oForm.value.Equipo2
          },
          fecha:this.oForm.value.fecha
        };
        this.new();
      }
    
  }

  new = (): void => {
    this.oPartidoService
      .newOne(this.oPartido)
      .subscribe((id:number) => {
        if (id) {
          console.log(id)
          this.strResult = 'El partido se ha creado correctamente';
        } else {
          this.strResult = 'Error en la creacion del partido';
        }
        this.openPopup();
      });
  };

   goBack(): void {
     this.oLocation.back();
   }

  //modal

  fila: IUsuario;
  id_tipousuario: number = null;
  showingModal: boolean = false;

  eventsSubjectShowModal: Subject<void> = new Subject<void>();
  eventsSubjectHideModal: Subject<void> = new Subject<void>();

  openModal(): void {
    this.eventsSubjectShowModal.next();
    this.showingModal = true;
  }

  onCloseModal(): void {
    //this.oRouter.navigate(['factura/view/' + this.id]);
  }

  closeModal(): void {
    this.eventsSubjectHideModal.next();
    this.showingModal = false;
  }



  //popup

  eventsSubjectShowPopup: Subject<void> = new Subject<void>();

  openPopup(): void {
    this.eventsSubjectShowPopup.next();
  }

  onClosePopup(): void {
    this.oRouter.navigate([this.strEntity + '/view/' + this.id]);
  }
  
}
