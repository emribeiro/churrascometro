import { CommonModule } from '@angular/common';
import { Component, OnInit, effect } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Churrasco } from '../../shared/models/churrasco/Churrasco';
import { ChurrascoBuilder } from '../../shared/models/churrasco/ChurrascoBuilder';
import { ChurrascometroService } from '../../shared/services/churrascometro.service';
import { TipoChurrasco } from '../../shared/models/churrasco/TipoChurrasco.enum';
import { MatRadioModule } from '@angular/material/radio';
import { Bebida } from '../../shared/models/Bebida';
import { Carne } from '../../shared/models/Carne';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ CommonModule
           , MatButtonModule
           , MatCheckboxModule
           , MatFormFieldModule
           , MatInputModule
           , MatRadioModule
           , MatProgressSpinnerModule
           , MatStepperModule
           , FormsModule
           , ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{

  formTipoChurrasco!: FormGroup;
  formPessoas!: FormGroup;
  formCarnes!: FormGroup;
  formBebidas!: FormGroup;
  exibirLoading: boolean = false;
  exibirResultados: boolean = false;
  churrasco!: Churrasco;

  carnesLista: { value: string; label: string; tipo: string }[] = [];
  bebidasLista: { value: string; label: string }[] = [];


  tiposChurrasco = Object.values(TipoChurrasco);
  tipochurrasco!: TipoChurrasco;
  tiposChurrascoEnum = TipoChurrasco;

  getCarnes = this.churrascometroService.getCarnes;
  getBebidas = this.churrascometroService.getBebidas;
 

  constructor(
    private formBuilder: FormBuilder,
    private churrascometroService: ChurrascometroService
  ){
    this.formTipoChurrasco = this.formBuilder.group({
      tipoChurrasco: ['', this.validateTipo()]
    })
    this.formPessoas = this.formBuilder.group({
      adultos: new FormControl(0, [Validators.required, Validators.min(0)]),
      criancas: new FormControl(null)
    });

    this.formCarnes = this.formBuilder.group({});

    this.formBebidas = this.formBuilder.group({});
   
    effect(() => {
      if(this.getBebidas()){
        this.formBebidas = this.formBuilder.group({});
        this.bebidasLista = [];
        this.getBebidas().forEach((bebida: Bebida) => {
          this.bebidasLista.push({
            value: bebida.nome,
            label: bebida.nome.charAt(0).toUpperCase() + bebida.nome.substring(1),
          })
          this.addFormControl(this.formBebidas, bebida.nome);
        });
      }
      if (this.getCarnes()) {
        this.formCarnes = this.formBuilder.group({});
        this.carnesLista = [];
        this.getCarnes().forEach((carne: Carne) => {
          if (!this.formCarnes.get(carne.nome)) {
            this.carnesLista.push({
              value: carne.nome,
              label: carne.nome.charAt(0).toUpperCase() + carne.nome.substring(1),
              tipo: carne.tipo
            })
            this.addFormControl(this.formCarnes, carne.nome);
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.churrascometroService.httpGetCarnes().subscribe();
    this.churrascometroService.httpGetBebidas().subscribe();
  }

  selecionarTipoChurrasco(){
    this.tipochurrasco = this.formTipoChurrasco.get('tipoChurrasco')?.value;
  }

  validateTipo(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value ? null : {required: true}
    }
  }

  submit(): void {
    if (this.formPessoas.valid &&
        this.formCarnes.valid && 
        this.formBebidas.valid) {

      this.exibirLoading = true;

      const formPessoasValues = this.formPessoas.value;

      const bebidasSelecionadas: string[] = [];
      const carnesSelecionadas: string[] = [];

      Object.entries(this.formCarnes.value).forEach(([key, value]) => {
        if (value) {
          carnesSelecionadas.push(key);
        }
      });
      Object.entries(this.formBebidas.value).forEach(([key, value]) => {
        if (value) {
          bebidasSelecionadas.push(key);
        }
      });

      const adultos = formPessoasValues.adultos;
      const criancas = formPessoasValues.criancas;

      const churrascoBuilder: ChurrascoBuilder = new ChurrascoBuilder(adultos, criancas, this.churrascometroService);
      churrascoBuilder.comCarnes(carnesSelecionadas);
      churrascoBuilder.comBebidas(bebidasSelecionadas);

      this.churrasco = churrascoBuilder.build();
      this.churrascometroService.createChurrasco(this.churrasco);

      setTimeout(() => {
        this.exibirLoading = false;
        this.exibirResultados = true;
      }, 2000);
    }
  }
  
  private addFormControl(formGroup: FormGroup, fieldName: string, validators: any[] = []): void {
    formGroup.addControl(fieldName, this.formBuilder.control(null, validators));
  }

}
