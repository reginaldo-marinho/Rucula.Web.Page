import { ComponentIconButton } from '../Components/ComponentIconButton' ;
import { button } from '../entities/form/button';
import { ElementBase } from './ElementBase';
import { ElementStrategy } from './ElementEstrategy';

export class ElementButton extends ElementBase implements ElementStrategy{

    createElement(button:button){     
        
        if(button.target == null || button.target == ""){
            throw new Error("target is requerid!")
        }
        this.element = document.createElement('button');
        this.element.classList.add("r-b-i");
        this.element.setAttribute('type','button');
        
        if(button.fullWidth){
            this.element.classList.add('r-button-full-width')
        }

        let _class = button?.class?.split(' ')
        
        _class?.forEach(item => {
            this.element.classList.add(item)
        })
        
        
        if((button.icon??="").length > 0){
            let icon = new ComponentIconButton({
                button:button
            }).create();
     
            this.element.appendChild(icon);

        }
        let span = document.createElement('span')
        span.textContent = button.text??"";
                
        this.element.appendChild(span);

        this.addColor(button.color);
        this.addDataIdAttribute(button);
        return this.element;
    }
}
