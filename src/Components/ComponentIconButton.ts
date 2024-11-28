import { TypeIcon } from "./ComponentTypes";
import { DOMComponent } from "./IComponent";

export class ComponentIconButton implements DOMComponent <HTMLElement, TypeIcon> {
    
    constructor(propert: TypeIcon) {
        this.propert = propert    
    }
    
    propert: TypeIcon

    create(): HTMLElement {
        
        let  icon = document.createElement('i')
        icon.textContent = ' '
        
        if(this.propert.button.icon === undefined || this.propert.button.icon.trim() === "") {
            return icon;
        }

        this.propert.button.icon?.split(" ").forEach(item => icon.classList.add(item))
        
        return icon;

    }
} 