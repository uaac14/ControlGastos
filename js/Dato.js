class Dato{
    constructor(descripcion, valor){
        this._drecipcion = descripcion;
        this._valor = valor;
        
    }
    get descripcion(){
        return this._drecipcion;
    }
    set descripcion(descripcion){
        this._drecipcion = descripcion;
    }
    get valor(){
        return this._valor;
    }
    set valor(valor){
        this._valor = valor;
    }

}