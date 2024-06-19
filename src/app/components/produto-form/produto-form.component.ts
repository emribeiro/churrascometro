import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, effect } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Carne } from '../../shared/models/Carne';
import { ChurrascometroService } from '../../shared/services/churrascometro.service';
import { Router } from '@angular/router';
import { TipoChurrasco } from '../../shared/models/churrasco/TipoChurrasco.enum';
import { MatSelectModule } from '@angular/material/select';
import { Bebida } from '../../shared/models/Bebida';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.scss'
})
export class ProdutoFormComponent implements OnInit {

  @Input() id!: string;
  @Input() produto: string = 'carnes';
  camposCarne = [
    { nome: 'nome', tipo: 'text', placeholder: 'Nome' },
    { nome: 'tipo', tipo: 'list', placeholder: 'Tipo' },
    { nome: 'preco_kg', tipo: 'number', placeholder: 'Preço por kg' },
    { nome: 'consumo_medio_adulto_g', tipo: 'number', placeholder: 'Consumo médio por adulto (g)' },
    { nome: 'consumo_medio_crianca_g', tipo: 'number', placeholder: 'Consumo médio por criança (g)' },
  ];
  camposBebida = [
    { nome: 'nome', tipo: 'text', placeholder: 'Nome' },
    { nome: 'tipo', tipo: 'text', placeholder: 'Tipo' },
    {
      nome: 'preco_unidade',
      tipo: 'number',
      placeholder: 'Preço por unidade',
    },
    {
      nome: 'consumo_medio_adulto_ml',
      tipo: 'number',
      placeholder: 'Consumo médio por adulto (ml)',
    },
    {
      nome: 'consumo_medio_crianca_ml',
      tipo: 'number',
      placeholder: 'Consumo médio por criança (ml)',
    },
  ];
  form!: FormGroup;
  getProduto = this.service.getProduto;
  campos!: any[];
  listTipoChurrasco: string[] = Object.values(TipoChurrasco);

  constructor( private formBuilder: FormBuilder
             , private service: ChurrascometroService
             , private router: Router){
    effect(() => {
      if(this.getProduto() && this.id){
        this.form.patchValue(this.getProduto());  
      }
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({ });
    
    this.campos = this.produto == 'carnes' ? this.camposCarne : this.camposBebida;
    this.campos.forEach((campo) => {
      this.addFormControl(campo.nome, [Validators.required]);
    });
  

    if(this.id){
      if(this.produto == 'carnes'){
        this.service.httpGetProduto(this.id, 'carnes').subscribe();
      }else{
        this.service.httpGetProduto(this.id, 'bebidas').subscribe();
      }
    }
  }

  private addFormControl(fieldName: string, validators: any[] = []): void{
    this.form.addControl(fieldName, this.formBuilder.control('', validators));
  }

  private updateProduto(produto: Carne | Bebida){
    this.service.httpUpdateProduto(this.id, this.produto, produto).subscribe({
      next: (produtoAtualizado) => {
        this.form.reset();
        this.router.navigate(['/produtos']);
      }
    })
  }

  private insertProduto(produto: Carne | Bebida){
    this.service.httpCreateProduto(produto, this.produto).subscribe({
      next: (produtoCriado) => {
        this.form.reset();
        console.log(produtoCriado);
        this.router.navigate(['/produtos']);
      }
    })
  }


  public submit(): void{
    if(this.form.valid){
      let produto!: Carne | Bebida;

      this.campos.forEach((campo) => {
        const value = this.getValorFormControl(campo.nome);

        if(value){
          produto = {
            ...produto,
            [campo.nome]: campo.tipo === 'number' ? parseFloat(value) : value
          }
        }
      });
      if(produto){
        if(this.id){
          this.updateProduto(produto);
        }else{
          this.insertProduto(produto); 
        } 
      }
      this.router.navigate(['/produtos']);
    }
  }

  private getValorFormControl(nome: string): string | null {
    return this.form.get(nome)?.value;
  }
}
