class WireClass{
    constructor(id,shape,color){
        this._id = id;
        this._shape = shape;
        this._color = color;
    }
    getShape(){
        return this._shape;
    }

    getId(){
        return this._id;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get shape() {
        return this._shape;
    }

    set shape(value) {
        this._shape = value;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }
}