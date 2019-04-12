class Component{
    constructor(id,imgSrc,location,width,height){
        this._id = id;
        this._imgSrc = imgSrc;
        this._location = {x:location.x,y:location.y};
        this._width = width;
        this._height = height;
        this._location = location;
    }


    get id() {
        return this._id;
    }

    get imgSrc() {
        return this._imgSrc;
    }

    get location() {
        return this._location;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    set id(value) {
        this._id = value;
    }

    set imgSrc(value) {
        this._imgSrc = value;
    }

    set location(value) {
        this._location = value;
    }

    set width(value) {
        this._width = value;
    }

    set height(value) {
        this._height = value;
    }
}