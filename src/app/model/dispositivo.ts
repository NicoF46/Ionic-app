export class Dispositivo{
    private _dispositivoId: number;
    private _nombre: string; 
    private _status: string;
    private _electrovalvulaId: number;

    static DispositivoDesdeJson(obj: Object){
        return new Dispositivo(
            obj['device_id'],
            obj['device_model'],
            obj['status'],
            obj['electrovalvulaid']
        )
    }

    constructor(dispositivo: number,nombre: string,status: string,electrovalvulaId: number){
        this._dispositivoId=dispositivo;
        this._nombre=nombre;
        this._status=status;
        this._electrovalvulaId=electrovalvulaId;
    }

    public get dispositivoId(): number {
        return this._dispositivoId;
    }
    public set dispositivoId(value: number) {
        this._dispositivoId = value;
    }

    public get nombre(): string {
        return this._nombre;
    }
    public set nombre(value: string) {
        this._nombre = value;
    }

    public get status(): string {
        return this._status;
    }
    public set status(value: string) {
        this._status = value;
    }
    
    public get electrovalvulaId(): number {
        return this._electrovalvulaId;
    }
    public set electrovalvulaId(value: number) {
        this._electrovalvulaId = value;
    }
}