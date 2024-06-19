import { ChurrascometroService } from "../../services/churrascometro.service";
import { Churrasco } from "./Churrasco";
import { TipoChurrasco } from "./TipoChurrasco.enum";

export class ChurrascoBuilder{
    churrasco: Churrasco = {
        adultos: 0,
        criancas: 0,
        valor_total: 0,
        tipo: '',
        ingredientes: []
    };

    constructor(adultos: number
               , criancas: number
               , tipo: TipoChurrasco
               , private churrascometroService: ChurrascometroService){
        
        this.churrasco.adultos = adultos;
        this.churrasco.criancas = criancas;
        this.churrasco.tipo = tipo;
        
    }

    comCarnes(
        carnes: string[]
    ): ChurrascoBuilder{

        carnes.forEach((carne) => {
            this.churrascometroService
            .getCarneByName(carne)
            .subscribe((carne) => {
                console.log(carne);
                const consumo =  (( this.churrasco.adultos * carne.consumo_medio_adulto_g + 
                                  this.churrasco.criancas * carne.consumo_medio_crianca_g) / 1000 ) *
                                  carne.preco_kg;
                this.churrasco.ingredientes?.push({nome: carne.nome, valor: consumo})
                this.churrasco.valor_total = this.churrasco.valor_total + consumo;
            });
        })
        
        return this;
    }

    comBebidas(
       bebidas: string[]
    ): ChurrascoBuilder{

        console.log('Bebidas: ' + bebidas);

        bebidas.forEach((bebida) => {
            this.churrascometroService
            .getBebidaByName(bebida)
            .subscribe((bebida) => {
                console.log('bebida')
                const consumo =  (( this.churrasco.adultos * bebida.consumo_medio_adulto_ml + 
                                  this.churrasco.criancas * bebida.consumo_medio_crianca_ml) / 1000 ) *
                                  bebida.preco_unidade;
                this.churrasco.ingredientes?.push({nome: bebida.nome, valor: consumo});
                this.churrasco.valor_total = this.churrasco.valor_total + consumo;

            });
        });
        
        return this;
    }

    build(): Churrasco{
        return this.churrasco;
    }
}