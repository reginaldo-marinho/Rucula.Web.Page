import { button } from "../entities/form/button";

export class ElementBase{
    element!:HTMLButtonElement|HTMLAnchorElement; 

    addDataIdAttribute(button:button){
        this.element.setAttribute("id",button.target);
    }
    addColor(color?:string){
        if (color)this.element!.style.color = color;
    }
}