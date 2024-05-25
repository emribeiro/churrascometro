import { ChurrascometroService } from "../../services/churrascometro.service";
import { Churrasco } from "./Churrasco";

export class ChurrascoBuilder{
    churrasco: Churrasco = {
        adultos: 0,
        criancas: 0,
        valor_total: 0,
        ingredientes: []
    };

    constructor(adultos: number
               , criancas: number
               , private churrascometroService: ChurrascometroService){
        
        this.churrasco.adultos = adultos;
        this.churrasco.criancas = criancas;
        
    }

    comCarne(
        nomeCarne: string
    ): ChurrascoBuilder{

        this.churrascometroService
            .getCarneByName(nomeCarne)
            .subscribe((carne) => {
                console.log(carne);
                const consumo =  (( this.churrasco.adultos * carne.consumo_medio_adulto_g + 
                                  this.churrasco.criancas * carne.consumo_medio_crianca_g) / 1000 ) *
                                  carne.preco_kg;
                this.churrasco.ingredientes?.push({nome: carne.nome, valor: consumo})
                this.churrasco.valor_total = this.churrasco.valor_total + consumo;
            });
        return this;
    }

    comBebida(
        nomeBebida: string
    ): ChurrascoBuilder{

        this.churrascometroService
            .getBebidaByName(nomeBebida)
            .subscribe((bebida) => {
                const consumo =  (( this.churrasco.adultos * bebida.consumo_medio_adulto_ml + 
                                  this.churrasco.criancas * bebida.consumo_medio_crianca_ml) / 1000 ) *
                                  bebida.preco_unidade;
                this.churrasco.ingredientes?.push({nome: bebida.nome, valor: consumo})
                this.churrasco.valor_total = this.churrasco.valor_total + consumo;
            });
        return this;
    }

    build(): Churrasco{
        return this.churrasco;
    }
}