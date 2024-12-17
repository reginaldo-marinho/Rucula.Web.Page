import { button } from '../entities/form/button';
import { Field } from '../elements/form/Field';
import { WindowBaseDOM } from '../elements/window-base/WindowBase';
import { constIdBaseWindow } from '../const';
import { URLRucula } from '../URL/urlManagment';
import { ManagmentObject } from '../object/ObjectManagment';

export class EventButton {

    field:Field
    managmentObject: ManagmentObject

    P:string
    constructor(field:Field, managmentObject: ManagmentObject,P:string) {
        this.field = field
        this.managmentObject = managmentObject
        this.P = P
    }
    eventButton(ruculaForm:HTMLElement, pathController:string, buttons:button[]){
        
        let rucula = ruculaForm

        buttons?.filter(b => b.type === "button")
        .forEach((button) => {
            
            let element:HTMLElement = document?.getElementById(`${this.P}${button.target}`) as HTMLElement

            let object =  {
                detail:{
                    url:'',
                    body:{}
                }
            }
            
            let dependency = {
                detail:{}
            }
            
            let eventButton = new CustomEvent(`${this.P}${button.target}`,object)
            let eventButtonDependency = new CustomEvent(`${this.P}${button.target}.dependency`,dependency)
            
            element?.addEventListener("click", () => {
                
                if(button.URL){
                    let url = new URLRucula(this.managmentObject, button.URL);
                    object.detail.url = url.getURL();
                }

                let optionObjectReturn = button?.body
                
                if(optionObjectReturn == undefined){
                    rucula.dispatchEvent(eventButton)
                    return
                }

                let dependencyCount = this.managmentObject.tableDependency.dependenciesCount()
                
                if( dependencyCount > 0){
                    this.field.focusFieldsWithDependency()
                    rucula.dispatchEvent(eventButtonDependency)
                    return;
                }

                if(optionObjectReturn  == ''){
                    object.detail.body = this.managmentObject.objectSeparate()
                }
                
                if(optionObjectReturn == '.'){
                    object.detail.body = this.managmentObject.objectFull()
                }
                
                if(['','.',undefined].find(c=> c != optionObjectReturn) == undefined){
                    object.detail.body = this.managmentObject.objectUnique(optionObjectReturn)
                }
                
                rucula.dispatchEvent(eventButton)
                
            })
        });
    }
    
    openCloseRightListButtons(){
        
        const openClose = document.getElementById(`${this.P}r-a-menu-vertical`) as HTMLElement
        const listRight = document.querySelector(`.${this.P}r-vertical-actions`) as HTMLElement
        
        const openClosemobile = document.getElementById(`${this.P}${constIdBaseWindow.BUTTONS_MENU_VERTICAL_MOBILE}`)
        
        openClose?.addEventListener("click",() => {
            listRight?.classList.toggle("r-display-none");
        })

        openClosemobile?.addEventListener("click",() => {
            listRight?.classList.toggle("r-display-none");
        })
    }    
}