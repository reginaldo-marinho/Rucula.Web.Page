import { ifError } from "assert";
import { window } from "../entities/form/window";
import { Popup } from "../popup/popup";

export class WindowAPI {

    private url:string

    constructor(url:string ) {
        this.url = url
    }
    
    async get(p:string) : Promise<window> {

        var myHeaders = new Headers();

        var init = {
            method: "GET",
            headers: myHeaders,
            mode: "cors",
            cache: "default",
        } as RequestInit;

        return await fetch(this.url,init)
        .then((response) => {
            if(response.ok){
                return response.json()
            }
            
           alert('Não foi possível abrir a Janela desejada')
           
        })
        .then(json => {
            return JSON.parse(json)
        })
        .catch(() => {
            var pp = new Popup(p)
            pp.error({
                text:'Não foi possível abrir a Janela desejada'
            })
        })
    }
}