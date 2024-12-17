import { buttonURL } from "../entities/form/button"
import { ruculaGlobal } from "../global/GlobalConfig"
import { ManagmentObject } from "../object/ObjectManagment"

export class URLRucula{
    
    private _URL?:buttonURL
    private managmentObject?: ManagmentObject    
    
    constructor(managmentObject?: ManagmentObject, URL:buttonURL = {} as buttonURL){

        if(URL.absolute == null) URL.absolute = ''
        if(URL.relative == null) URL.relative = ''
        if(URL.params == null) URL.params = ''
        
        this._URL = URL
        this.managmentObject = managmentObject
    }

    getURL(){

        let url = ''

        if(this._URL == undefined){
            return this.domain()
        }

        if(this._URL.absolute!.length > 0) {
            url = this.path(this._URL.absolute!)
        }
        else{
            url = this.domain()
        }
        
        if (this._URL.relative!.length > 0) {
            let path = this.path(this._URL.relative!);
            url = `${url}/${path}`;
        }
        
        let params = ''

        if(this._URL.params!.length > 0 ){
            params = this.path(this._URL.params!)
            url = `${url}?${params}`
            return url 
        }

        if(url == ''){
            return this.domain()
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

    private path(path:string){
        
        path = this.createWithParams(path)
        path = this.createWithoutParams(path)

        return path
    }


    private createWithParams (path:string){
        var regex = /([^&]+=)({([^}&]+)})/g;

        var matches = path.matchAll(regex);

        for (const match of matches) {
            
            var propertValue = match[3]
            var value = this.managmentObject?.getPropert(propertValue)

             path = path.replace(match[0],`${match[1]}${value}`)
        }

        return path
    }

    private createWithoutParams (path:string){
        
        var regex = /\/{([^}&]+)}/gm

        var matches = path.matchAll(regex);

        for (const match of matches) {
            
            var propertValue = match[1]

            var value = this.managmentObject?.getPropert(propertValue)

            path = path.replace(match[0],`/${value}`)
        }
        
        return path
    }  
} 