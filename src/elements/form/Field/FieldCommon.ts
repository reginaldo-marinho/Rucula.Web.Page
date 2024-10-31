
import { FieldInput } from "./FieldInput";
import { constAttrInput, constTypeInput } from "../../../const";
import { FileEventCommon } from "./event/FileEventCommon";
import { FileEventCurrency } from "./event/FileEventCurrency";


export class FieldCommon extends FieldInput{
    
    create(){
        
        const input = document.createElement('input');
        
        this.input = input;

        if(this.floatLabel == true){
            this.input.classList.add('did-floating-input')
        }

        input.setAttribute('placeholder','')

        input.setAttribute(constAttrInput.ATTR_TYPE,this.field.type)

        if(this.field?.disable){
            input.setAttribute("disabled","")
        }

        input.type = this.field.type;
        
        if(this.field.type == "currency"){
            input.type = "text";
        }
        
        this.setWidth()
        input.classList.add("r-i-control")
        
        this.setEvents()
    }

    protected setEvents(): void {

        new FileEventCommon(this.managmentObject, this.input, this.field,this.windowBaseDOM);

        if(this.field.type == constTypeInput.CURRENCY){
            new FileEventCurrency(this.managmentObject, this.input, this.field,this.windowBaseDOM);    
        }
    }
}
