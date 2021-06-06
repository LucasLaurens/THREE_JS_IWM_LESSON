class Global {
    /**
    * Singleton
    */
    constructor() {}

    getInstance() {
        if(!this._instance) {
           this._instance = {};
        }
        return  this._instance;
    }
}

export default new Global();