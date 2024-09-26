import { FileEvent } from "./FileEvent";

export class FileEventCheckBox extends FileEvent{

    protected setEventListener(): void {

        this.input.addEventListener('change',(e) => {    
            let element = e.target as HTMLInputElement
    
            if (element.checked == true){
                element.value = this.field!.checkbox!.on
            }
    
            if (element.checked == false){
                element.value = this.field!.checkbox!.off
            }
            this.set()
        })

        this.input.addEventListener('blur',(e) => {    

            let element = e.target as HTMLInputElement
    
            let identity = element.getAttribute("identity") as string
            
            let fragment = this.managmentObject.getFragmentForIdentity(identity)
            
            let line = fragment.config.line
            
            let propert = `${fragment.config.alias}.${fragment.config.propertDto}${line == undefined ? '' : Number(line)}`
            
            let value = this.managmentObject.getPropert(propert)

            if(value == this.field!.checkbox!.on){
                element.checked  = true    
            }
            if(value == this.field!.checkbox!.off){
                element.checked  = false
            }
            //! This function helps to maintain the correct behavior of the check box when the value is entered from the setValue calls of Rucula.
            //! call set() is unnecessary  
        })
    }
}

