export interface IEquipo {
    id: number,
    nombre: string,
    descripcion: string,
    siglas:string
}
export interface IEquipoPage{
    content: IEquipo[],
    totalElements: number,
    totalPages: number
}