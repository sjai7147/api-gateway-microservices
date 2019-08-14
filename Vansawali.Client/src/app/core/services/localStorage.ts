

export class LocalStorage {
   
    constructor( ){}

    setToStorage(key:any,item:any){
            localStorage.setItem(key,item);
    }
    getFromStorage(key:any){
        return localStorage.getItem(key)|| null;
    }

}