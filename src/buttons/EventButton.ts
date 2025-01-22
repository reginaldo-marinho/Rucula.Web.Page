import { button } from '../entities/form/button';
import { Field } from '../elements/form/Field';
import { constIdBaseWindow, constTargetButtonCrudDefault } from '../const';
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
                
                let defaultsButton = [
                    this.P+constTargetButtonCrudDefault.SAVE,
                    this.P+constTargetButtonCrudDefault.ALTER,
                    this.P+constTargetButtonCrudDefault.DELETE,
                ]

                if(optionObjectReturn == undefined && defaultsButton.indexOf(button.target) > -1){
                    rucula.dispatchEvent(eventButton)
                    return
                }

                let dependencyCount = this.managmentObject.tableDependency.dependenciesCount()
                
                if( dependencyCount > 0){
                    this.field.focusFieldsWithDependency()
                    rucula.dispatchEvent(eventButtonDependency)
                    return;
                }

                if(optionObjectReturn  === ''){
                    object.detail.body = this.managmentObject.objectSeparate()
                }
                
                if(optionObjectReturn === '.'){
                    object.detail.body = this.managmentObject.objectFull()
                }
                
                if(optionObjectReturn && String(optionObjectReturn).length > 1){
                    object.detail.body = this.managmentObject.objectUnique(optionObjectReturn)
                }
                
                rucula.dispatchEvent(eventButton)
                
            })
        });
    }
    
    openCloseRightListButtonsActions(){
        
        const buttonOpenClose = document.getElementById(`${this.P}r-a-menu-vertical`) as HTMLElement
        const buttonMobileClose = document.getElementById(`${this.P}${constIdBaseWindow.BUTTON_MENU_VERTICAL_MOBILE_CLOSE}`)
        const buttonOpenClosemobile = document.getElementById(`${this.P}${constIdBaseWindow.BUTTONS_MENU_VERTICAL_MOBILE}`)
        
        const divRightListButtonsActions = document.querySelector(`.r-vertical-actions`) as HTMLElement
        
        buttonOpenClose?.addEventListener("click",() => {
            divRightListButtonsActions?.classList.toggle("r-display-none");
            
        })

        buttonOpenClosemobile?.addEventListener("click",() => {
            divRightListButtonsActions?.classList.toggle("r-display-block");
        })

        buttonMobileClose?.addEventListener("click",() => {
            divRightListButtonsActions?.classList.toggle("r-display-block");
        })        
    }    
}