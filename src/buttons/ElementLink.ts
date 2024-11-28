import { ComponentIconButton } from '../Components/ComponentIconButton';
import { button } from '../entities/form/button';
import { ElementBase } from './ElementBase';
import { ElementStrategy } from './ElementEstrategy';

export class ElementLink extends ElementBase implements ElementStrategy{
    
    
    createElement(button:button){
        this.element = document.createElement('a')
        this.element.textContent = button.text+""
        this.element.href = `${button.link}`
        this.element!.classList.add("btn-link")
        this.element!.setAttribute('target',"_blank")


        if((button.icon??="").length){
            
            let icon = new ComponentIconButton({
                button:button
            }).create();
            this.element.appendChild(icon);    
        }

        
        return this.element;
    }
}
