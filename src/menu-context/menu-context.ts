import { contextMenu } from "../const"
import { button } from "../entities/form/button"

export class MenuContext{
        
    P:string
    constructor(P:string) {
       this. P = P
        
    }
    menusContext:{id:string,element:HTMLDivElement}[] = []
    elemetInFocu!: HTMLElement

    private createMenuContext(id:string){
        
        let div = document.createElement('div')
        div.classList.add('context-menu')
        div.setAttribute('id',id)

        let ol = document.createElement('ol')

        div.appendChild(ol)

        this.menusContext.push({id:id,element:div})
 
        return div
    }

    private findMenu(id:string){

        let menu = this.menusContext.find(c=> c.id == id)!

        return menu.element

    }

    private  addItem(idMenuContext:string, buttonConfig:button){

        let menu = this.findMenu(idMenuContext).querySelector('ol')!

        var li = document.createElement('li')
        var button = document.createElement('button')
        button.classList.add('r-b-i') 
        button.setAttribute('id',buttonConfig.target)
        button.textContent = buttonConfig.text!


        li.appendChild(button)
        menu.appendChild(li)
    }

    private  menuContextInput(){
        
        let detailsInput:button =  {
            target:'input-check-details',
            text: 'detalhe do campo',
            type:'button',
        }

        let menu = this.createMenuContext(contextMenu.INPUT)
        this.addItem(contextMenu.INPUT,detailsInput )

        return menu

    }

       
    elemetInFocus(){
        return this.elemetInFocu
    }
        init (){

            
            let menuInput = this.menuContextInput()
            let rw = document.querySelector(`.${this.P}r-w`)

            rw?.appendChild(menuInput)
            rw?.addEventListener('contextmenu', (event:any) => {
                
                event.preventDefault()
                let target = event.target as HTMLElement
                this.elemetInFocu = target

                if(target.classList.contains('r-q-b') || target.classList.contains('r-q-l')){
                    return
                }
                
                if(target.classList.contains('r-head')){
                    
                }

                if(target.classList.contains('r-vertical-actions')){
                    
                }


                if(target.nodeName == 'INPUT' || target.nodeName == 'SELECT' || target.nodeName == 'TEXTAREA'){
                    
                    let menuActions = this.findMenu(contextMenu.INPUT)
                    menuActions.style.display = 'block';
                    menuActions.style.left = `${event.pageX}px`;
                    menuActions.style.top = `${event.pageY}px`;
                }
            })

            document.addEventListener('click', (event) => {
                
                if (event.button !== 2) {
                    let menuInput = this.findMenu(contextMenu.INPUT);
                    menuInput.style.display = 'none'
                    //todo Inplementar menus frame e header
                }
            });
        }
}