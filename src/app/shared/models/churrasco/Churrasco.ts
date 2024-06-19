export interface Churrasco{
    id?: number;
    adultos: number;
    criancas: number;
    valor_total: number;
    tipo: string;
    ingredientes?: [{
        nome: string;
        valor: number;
    }?]
}