import { ManagmentObject } from "../object/ObjectManagment"

export class EventManagment {

    private managmentObject:ManagmentObject
    private p:string
    
    private elementRoot:HTMLElement
    constructor(p:string, managmentObject:ManagmentObject,elementRoot:HTMLElement) {
        this.p = p
        this.managmentObject =  managmentObject
        this.elementRoot = elementRoot
    }
    getFieldDetails (event:CustomEvent) {
    
        let identity = event.detail.identity

        return {
            identity: (identity.element as HTMLElement).getAttribute('identity'),
            name:identity.name,
            row: identity.row,
            value: this.managmentObject.getPropert(identity.name),
            targetPathWithRow:(targetPath:string) => {

                //? This method helps to create Target Path with the current event line
                return `${targetPath}.${identity.row}`
            }             
        }
    } 

    on(event:string, callback:any, query?:string) {
            
        let rucula = this.elementRoot

        if(query == undefined){
            rucula.addEventListener(`${this.p}${event}`, (e) => callback(e))
            return
        }

        let itens = rucula.querySelectorAll(query)

        itens.forEach((item) => {
            item.addEventListener(event, (e) => callback(e))
        }) 
    }
}