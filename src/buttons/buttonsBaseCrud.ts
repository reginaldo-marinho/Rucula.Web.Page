import { constIdBaseWindow, constTargetButtonCrudDefault } from "../const"

export class ButtonsBase {
    
    buttonCreate!:HTMLButtonElement
    buttonAlter!:HTMLButtonElement
    buttonDelete!:HTMLButtonElement

    buttonsPlus!:HTMLButtonElement
    olButtonsPlus!:HTMLOListElement

    P:string
    constructor(P:string) {
        this.P = P

    }
    initButtonsTypeCrudDefault(){
        this.buttonCreate = document.getElementById(`${this.P}${constTargetButtonCrudDefault.SAVE}`) as HTMLButtonElement
        this.buttonAlter = document.getElementById(`${this.P}${constTargetButtonCrudDefault.ALTER}`) as HTMLButtonElement
        this.buttonDelete = document.getElementById(`${this.P}${constTargetButtonCrudDefault.DELETE}`) as HTMLButtonElement            
    }

    initButtonPlus(){
        this.buttonsPlus = document.getElementById(`${this.P}${constIdBaseWindow.BUTTONS_MENU_VERTICAL}`) as HTMLButtonElement
        this.olButtonsPlus = document.getElementById(`${this.P}${constIdBaseWindow.BUTTONS_MENU_VERTICAL_LIST}`) as HTMLOListElement     

        if(this.olButtonsPlus.querySelectorAll("button,a").length == 0){
            this.buttonsPlus.remove();
            this.olButtonsPlus.remove()
        }
    }

    clickCreate () {
        this.buttonCreate.click()
    } 
                    
    clickAlter(){
        this.buttonAlter.click()
    } 

    clickDelete(){
        this.buttonDelete.click()
    } 
            
    removeCreate(){
        this.buttonCreate.remove()
    } 

    removeAlter() {
        this.buttonAlter.remove()
    }

    removeDelete(){
        this.buttonDelete.remove()
    } 
           
    crud (crud:string) {
        
        if(crud == "" || crud == undefined){
            this.buttonCreate.remove()
            this.buttonAlter.remove()
            this.buttonDelete.remove()
            return
        }

        let options = "crud";
        
        for (let index = 0; index < crud.length; index++) {
            
            let indexof = options.indexOf(crud[index])

            options = options.replace(options[indexof],"")
        }

        if(options.length < 1 || (options.length == 1 && options[0] == "r")){
            return
        }

        for (let index = 0; index < options.length; index++) {
            
            if(options[index] == "c"){
                this.buttonCreate.remove()
            }

            if(options[index] == "u"){
                this.buttonAlter.remove()
            }

            if(options[index] == "d"){
                this.buttonDelete.remove()
            }
        }   
    }

}