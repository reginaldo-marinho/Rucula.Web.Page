import { constIdBaseWindow, constTargetButtonCrudDefault } from "../const"

export let buttonsBase = (function (){
    
    let buttonCreate:HTMLButtonElement
    let buttonAlter:HTMLButtonElement
    let buttonDelete:HTMLButtonElement

    let buttonsPlus:HTMLButtonElement
    let olButtonsPlus:HTMLOListElement

    
    return {

        initButtonsTypeCrudDefault: () => {
            buttonCreate = document.getElementById(constTargetButtonCrudDefault.SAVE) as HTMLButtonElement
            buttonAlter = document.getElementById(constTargetButtonCrudDefault.ALTER) as HTMLButtonElement
            buttonDelete = document.getElementById(constTargetButtonCrudDefault.DELETE) as HTMLButtonElement            
        },

        initButtonPlus: () => {
            buttonsPlus = document.getElementById(constIdBaseWindow.BUTTONS_MENU_VERTICAL) as HTMLButtonElement
            olButtonsPlus = document.getElementById(constIdBaseWindow.BUTTONS_MENU_VERTICAL_LIST) as HTMLOListElement     

            if(olButtonsPlus.querySelectorAll("button,a").length == 0){
                buttonsPlus.remove();
                olButtonsPlus.remove()
            }
        },

        buttonsTypeCrud: {
            click: {
                create:() => buttonCreate.click(),
                alter:() => buttonAlter.click(),
                delete:() => buttonDelete.click()
            },
            remove: {
                create:() => buttonCreate.remove(),
                alter:() => buttonAlter.remove(),
                delete:() => buttonDelete.remove()
            },
            crud:(crud:string) => {
                if(crud == "" || crud == undefined){
                    buttonCreate.remove()
                    buttonAlter.remove()
                    buttonDelete.remove()
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
                        buttonCreate.remove()
                    }

                    if(options[index] == "u"){
                        buttonAlter.remove()
                    }

                    if(options[index] == "d"){
                        buttonDelete.remove()
                    }
                }   
            }
        }
    }
})()