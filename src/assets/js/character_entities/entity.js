class Entity {
    constructor(currentPosX, currentPosY, characteristics) {        
        this._currentPosX = currentPosX;
        this._currentPosY = currentPosY;
        //Pour faire en sorte de lier à this toutes les propriétés de l'objet characteristics sans les énumérer une par une
        Object.assign(this, characteristics);        
    }
}

export default Entity;