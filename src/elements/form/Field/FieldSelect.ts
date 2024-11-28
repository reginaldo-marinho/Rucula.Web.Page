import { FieldInput } from "./FieldInput";
import { FileEventSelect } from "./event/FileEventSelect";

export class FieldSelect extends FieldInput{
    
    create() {

        const select = document.createElement('select');
        
        this.input = select;

        this.setWidth()

        if(this.floatLabel == true){
            this.input.classList.add('did-floating-select')
        }
        
        this.field.combo?.forEach(item => {
            
            const option = document.createElement('option')
            option.text = item["representation"]
            option.value = item["value"]
            select.appendChild(option)
            
        })
        this.input.value = String(this.field.value)
        this.setEvents();
        
        return select
    }

    protected setEvents(): void {
        new FileEventSelect(this.managmentObject, this.input, this.field, this.ruculaForm)
    }
}
