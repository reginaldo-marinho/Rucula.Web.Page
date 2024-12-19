import { maskInput, maskOutput } from "../../../../common/mask";
import { constPrefixEventField } from "../../../../const";
import { FileEvent } from "./FileEvent";

export class FileEventCommon extends FileEvent{

   
    protected setEventListener(): void {

        this.input.addEventListener('focus',() => {
            
            if(this.field.mask  && this.input.value){
                this.input.value =  maskOutput(this.input.value,this.field.mask)
            }
            
            this.dispatchEvent(constPrefixEventField.BEFORE);
            
            this.set()
            
           
        })

        this.input.addEventListener('input',() => {
            this.set()
            this.dispatchEvent(constPrefixEventField.INPUT);
        })

        this.input.addEventListener('focusout',() => {            
            this.dispatchEvent(constPrefixEventField.AFTER);
            this.set()

            if(this.field.mask  && this.input.value){
                this.input.value = maskInput(this.input.value,this.field.mask)
            }
        })
    }
}

