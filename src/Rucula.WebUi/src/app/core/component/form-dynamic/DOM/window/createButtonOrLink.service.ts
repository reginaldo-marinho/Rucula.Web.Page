import { Injectable } from '@angular/core';
import { button } from '../../entities/form/button';

@Injectable({
    providedIn: 'root',
})
export class createButtonOrLinkService {
 

    public createButtonOrLink (button:button):HTMLButtonElement|HTMLAnchorElement{
        let  buttonOrLink:HTMLButtonElement|HTMLAnchorElement      
        if(button.type != "button" && button.type != "link"){
          throw new Error("tipo do botão deve ser button ou link");
        }
        if(button.type == "button"){
          buttonOrLink = document.createElement('button')  
          buttonOrLink!.classList.add("btn")
          buttonOrLink!.classList.add("mb-1")
          buttonOrLink.textContent = button.text+""
        }
        if(button.type == "link"){
          buttonOrLink = document.createElement('a')
          buttonOrLink.textContent = button.text+""
          buttonOrLink.href = `${button.link}`
          buttonOrLink!.classList.add("btn-link")
          buttonOrLink!.setAttribute('target',"_blank")
        }
        buttonOrLink!.setAttribute("data-id",`${button.type}-${button.method}-${button.id}`);
        if (button.color){
          buttonOrLink!.style.backgroundColor = button.color
        }
    
        if (button.icon){
          let  icon = document.createElement('i')
          button.icon.split(" ").forEach(item => 
            icon.classList.add(item)
          )
          buttonOrLink!.appendChild(icon)
        }
        return buttonOrLink!
    } 
}