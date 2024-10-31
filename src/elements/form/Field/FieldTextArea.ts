import { FieldInput } from "./FieldInput";
import { FileEventCommon } from "./event/FileEventCommon";

export class FieldTextArea extends FieldInput{
    
    create() {

        const input = document.createElement('textarea');
        
        this.input = input;
        
        this.input.classList.add('r-i-control')
        
        input.setAttribute('placeholder','')
        
        if(this.floatLabel == true){
            this.input.classList.add('did-floating-input')
        }

        if(this.field?.disable){
            input.setAttribute("disabled","")
        }
        
        input.setAttribute("rows", String(this.field.textarea?.rows))

        if(this.field.textarea?.cols){
            input.setAttribute("cols", String(this.field.textarea?.cols))
        }
        else {
            input.style.width = "100%";
        }
        this.setEvents()
        return input;
    }
    
    protected setEvents(): void {
        new FileEventCommon(this.managmentObject, this.input, this.field, this.windowBaseDOM)
    }
}