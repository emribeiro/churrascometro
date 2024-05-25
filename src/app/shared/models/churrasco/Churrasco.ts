export interface Churrasco{
    adultos: number;
    criancas: number;
    valor_total: number;
    ingredientes?: [{
        nome: string;
        valor: number;
    }?]
}