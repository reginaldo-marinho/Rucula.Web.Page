import { ruculaGlobal } from "../global/GlobalConfig"
import { ManagmentObject } from "../object/ObjectManagment"


export class URLRucula{
    
    private _URL?:{absolute:string, relative:string, params:string}
    
    private managmentObject: ManagmentObject    
    
    constructor(managmentObject: ManagmentObject, URL?:{absolute:string, relative:string, params:string}){
        this._URL = URL
        
        this.managmentObject = managmentObject
    }

    getURL(){

        if(this._URL == undefined){
            return this.domain()
        }

        let URL = this._URL;

        if(URL?.absolute?.length > 0) {
            let url = this.path(URL.absolute)
            return url
        }
        
        let url = this.domain()
        
        if (URL?.relative?.length > 0) {
            let path = this.path(URL.relative);
            url = `${url}/${path}`;
        }
        
        let params = ''

        if(URL?.params?.length > 0 ){
            params = this.path(URL.params)
            url = `${url}?${params}`
            return url 
        }

        return url
    }

    domain(env:string = ''){

        // Todo - Prestar suporte para obtenção de ambiente

        ruculaGlobal.getEnvironment()
        let enviroment = ruculaGlobal.getEnvironment();

        if(enviroment.port){    
            return `${enviroment.hostname}:${enviroment.port}`
        }

        return `${enviroment.hostname}`
    }

    path(path:string){
        
        path = this.createWithParams(path)
        path = this.createWithoutParams(path)

        return path
    }


    private createWithParams (path:string){
        var regex = /([^&]+=)({([^}&]+)})/g;

        var matches = path.matchAll(regex);

        for (const match of matches) {
            
            var propertValue = match[3]
            var value = this.managmentObject.getPropert(propertValue)

             path = path.replace(match[0],`${match[1]}${value}`)
        }

        return path
    }

    private createWithoutParams (path:string){
        
        var regex = /\/{([^}&]+)}/gm

        var matches = path.matchAll(regex);

        for (const match of matches) {
            
            var propertValue = match[1]

            var value = this.managmentObject.getPropert(propertValue)

            path = path.replace(match[0],`/${value}`)
        }
        
        return path
    }  
} 