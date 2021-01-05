export class DefaultFilterModel {
    pag: number = 10;
    filtro: string;
    verTodas: boolean = false;
    orderBy: string;
    orderByDirection: string = 'asc';
}