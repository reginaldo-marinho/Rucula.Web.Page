import { button } from '../entities/form/button';
import { Field } from '../elements/form/Field';
import { WindowBaseDOM } from '../elements/window-base/WindowBase';
import { constIdBaseWindow } from '../const';
import { URLRucula } from '../URL/urlManagment';
import { ManagmentObject } from '../object/ObjectManagment';

export class EventButton {

    field:Field
    managmentObject: ManagmentObject

    windowBaseDOM:WindowBaseDOM
    
    constructor(field:Field, managmentObject: ManagmentObject,windowBaseDOM:WindowBaseDOM) {
        this.field = field
        this.managmentObject = managmentObject
        this.windowBaseDOM = windowBaseDOM
    }
    eventButton(pathController:string, buttons:button[]){
        
        let rucula = this.windowBaseDOM.getElementRoot()

        buttons?.filter(b => b.type === "button")
        .forEach((button) => {
            
            let element:HTMLElement = document?.getElementById(button.target) as HTMLElement
            
            let object =  {
                detail:{
                    url:'',
                    body:{}
                }
            }
            
            let dependency = {
                detail:{}
            }
            
            let eventButton = new CustomEvent(`${button.target}`,object)
            let eventButtonDependency = new CustomEvent(`${button.target}.dependency`,dependency)
            
            element?.addEventListener("click", () => {
                                
                let dependencyCount = this.managmentObject.tableDependency.dependenciesCount()
                
                if( dependencyCount > 0){
                    this.field.focusFieldsWithDependency()
                    rucula.dispatchEvent(eventButtonDependency)
                    return;
                }''
                
                if(button.URL){
                    let url = new URLRucula(this.managmentObject, button.URL);
                    object.detail.url = url.getURL();
                }
                
                
                let option = button?.body
                
                if(option == undefined){
                    rucula.dispatchEvent(eventButton)
                    return
                }
                
                if(option  == ''){
                    object.detail.body = this.managmentObject.objectSeparate()
                }
                
                if(option == '.'){
                    object.detail.body = this.managmentObject.objectFull()
                }
                
                if(['','.',undefined].find(c=> c != option) == undefined){
                    object.detail.body = this.managmentObject.objectUnique(option)
                }
                
                rucula.dispatchEvent(eventButton)
                
            })
        });
    }
    
    openCloseRightListButtons(){
        
        const openClose = document.getElementById("r-a-menu-vertical") as HTMLElement
        const listRight = document.querySelector(".r-vertical-actions") as HTMLElement
        
        const openClosemobile = document.getElementById(constIdBaseWindow.BUTTONS_MENU_VERTICAL_MOBILE)
        
        openClose?.addEventListener("click",() => {
            listRight?.classList.toggle("r-display-none");
        })

        openClosemobile?.addEventListener("click",() => {
            listRight?.classList.toggle("r-display-none");
        })
    }    
}