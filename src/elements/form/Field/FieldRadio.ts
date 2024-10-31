import { FieldInput } from "./FieldInput";
import { FileEventCommon } from "./event/FileEventCommon";

export class FieldRadio extends FieldInput{
    
    create(){
        
        let input  = document.createElement("input")
        
        this.input = input;

        this.input.type = "radio";
        
        if(this.field.value === undefined || this.field.value === ""){
            
            throw new Error("Value in type radio is requerid");
        }
        
        this.input.value = this.field.value
        this.setEvents()
    }

    protected setEvents(): void {
        new FileEventCommon(this.managmentObject, this.input, this.field,this.windowBaseDOM)
    }
}