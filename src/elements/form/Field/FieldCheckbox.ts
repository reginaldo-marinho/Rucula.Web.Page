import { ManagmentObject } from "../../../object/ObjectManagment";
import { FieldInput } from "./FieldInput";
import { FileEventCheckBox } from "./event/FileEventCheckBox";
import { FileEventCommon } from "./event/FileEventCommon";

export class FieldCheckbox extends FieldInput{
    
    create(){

        var input = document.createElement("input")
    
        this.input = input;
        
        input.type = "checkbox";
    
        input.checked = false 

        if(this.field.value == this.field.checkbox!.on){
            input.checked = true
        }

        this.setEvents()
        return input;
    }
    protected setEvents(): void {
        new FileEventCommon(this.managmentObject, this.input, this.field, this.ruculaForm)
        new FileEventCheckBox(this.managmentObject, this.input, this.field, this.ruculaForm)
    }

}



