export class Riego{
    private _riegoid: number;
    private _fecha: Date; 
    private _apertura: number;


    static RiegoDesdeJson(obj: Object){
        return new Riego(
            obj['logriegoid'],
            obj['fecha'],
            obj['apertura']
        )
    }

    constructor(riego,fecha,apertura){
        this._riegoid=riego;
        this._fecha=fecha;
        this._apertura=apertura;
    }

    public get riegoId(): number {
        return this._riegoid;
    }
    public set riegoId(value: number) {
        this.riegoId = value;
    }

    public get fecha(): Date {
        return this._fecha;
    }
    public set fecha(value: Date) {
        this._fecha = value;
    }

    public get apertura(): number {
        return this._apertura;
    }
    public set apertura(value: number) {
        this._apertura = value;
    }
}