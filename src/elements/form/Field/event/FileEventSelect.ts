import { constPrefixEventField } from "../../../../const";
import { FileEvent } from "./FileEvent";

export class FileEventSelect extends FileEvent{

   
    protected setEventListener(): void {

        this.input.addEventListener('change',(e) => {  
            
            this.dispatchEvent(constPrefixEventField.BEFORE);
            this.set()
        })
    }
}

