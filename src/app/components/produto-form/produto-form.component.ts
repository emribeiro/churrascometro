import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.scss'
})
export class ProdutoFormComponent implements OnInit {
  campos = [
    { nome: 'nome', tipo: 'text', placeholder: 'Nome' },
    { nome: 'tipo', tipo: 'text', placeholder: 'Tipo' },
    { nome: 'preco_kg', tipo: 'number', placeholder: 'Preço por kg' },
    { nome: 'consumo_medio_adulto_g', tipo: 'number', placeholder: 'Consumo médio por adulto (g)' },
    { nome: 'consumo_medio_crianca_g', tipo: 'number', placeholder: 'Consumo médio por criança (g)' },
  ];
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({ });

    this.campos.forEach((campo) => {
      this.addFormControl(campo.nome, [Validators.required]);
    });
  }

  private addFormControl(fieldName: string, validators: any[] = []): void{
    this.form.addControl(fieldName, this.formBuilder.control('', validators));
  }
}
