import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class FormComponent {

  formTipoChurrasco!: FormGroup;
  formPessoas!: FormGroup;
  formCarnes!: FormGroup;
  formBebidas!: FormGroup;
  exibirLoading: boolean = false;
  exibirResultados: boolean = false;
  churrasco!: Churrasco;

  carnesLista = [
    { value: 'picanha', label: 'Picanha', tipo: 'Normal' },
    { value: 'costela', label: 'Costela', tipo: 'Normal' },
    { value: 'linguica', label: 'Linguiça', tipo: 'Normal' },
    { value: 'frango', label: 'Frango', tipo: 'Normal' },
    { value: 'queijo', label: 'Queijo', tipo: 'Vegetariano' },
    { value: 'abacaxi', label: 'Abacaxi', tipo: 'Vegano' },
  ];

  bebidasLista = [
    { value: 'cerveja', label: 'Cerveja' },
    { value: 'refrigerante', label: 'Refrigerante' },
    { value: 'agua', label: 'Água' },
    { value: 'suco', label: 'Suco' },
  ];

  tiposChurrasco = Object.keys(TipoChurrasco);
  tipochurrasco!: TipoChurrasco;

 

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
    this.formCarnes = this.formBuilder.group({
      picanha: new FormControl(null),
      costela: new FormControl(null),
      linguica: new FormControl(null),
      frango: new FormControl(null),
      abacaxi: new FormControl(null),
      queijo: new FormControl(null)
    });

    this.formBebidas = this.formBuilder.group({
      cerveja: new FormControl(null),
      refrigerante: new FormControl(null),
      agua: new FormControl(null),
      suco: new FormControl(null)
    });
  }

  selecionarTipoChurrasco(){
    this.tipochurrasco = this.formTipoChurrasco.get('tipoChurrasco')?.value;
    console.log(this.tipochurrasco);
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
      const formCarnesValues = this.formCarnes.value;
      const formBebidasValues = this.formBebidas.value;

      console.log(formPessoasValues);
      console.log(formCarnesValues);
      console.log(formBebidasValues);

      const adultos = formPessoasValues.adultos;
      const criancas = formPessoasValues.criancas;

      const picanha = formCarnesValues.picanha;
      const costela = formCarnesValues.costela;
      const linguica = formCarnesValues.linguica;
      const frango = formCarnesValues.frango;

      const cerveja = formBebidasValues.cerveja;
      const refrigerante = formBebidasValues.refrigerante;
      const agua = formBebidasValues.agua;
      const suco = formBebidasValues.suco;

      const churrascoBuilder: ChurrascoBuilder = new ChurrascoBuilder(adultos, criancas, this.churrascometroService);

      if(picanha) churrascoBuilder.comCarne('picanha');
      if(costela) churrascoBuilder.comCarne('costela');
      if(linguica) churrascoBuilder.comCarne('linguica');
      if(frango) churrascoBuilder.comCarne('frango');

      if(cerveja) churrascoBuilder.comBebida('cerveja');
      if(refrigerante) churrascoBuilder.comBebida('refrigerante');
      if(agua) churrascoBuilder.comBebida('agua');
      if(suco) churrascoBuilder.comBebida('suco');

      this.churrasco = churrascoBuilder.build();

      setTimeout(() => {
        this.exibirLoading = false;
        this.exibirResultados = true;
      }, 2000);
    }
  }
  

}
