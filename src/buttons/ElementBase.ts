import { button } from "../entities/form/button";

export class ElementBase{
    protected p:string
    constructor(p:string) {            
        this.p = p
    }
    element!:HTMLButtonElement|HTMLAnchorElement; 

    addDataIdAttribute(button:button){
        this.element.setAttribute("id",`${this.p}${button.target}`);
    }
    addColor(color?:string){
        if (color)this.element!.style.color = color;
    }
}