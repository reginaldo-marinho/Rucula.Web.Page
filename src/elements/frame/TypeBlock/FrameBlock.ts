import { frame } from "../../../entities/form/frame";
import { managmentObject } from "../../../object/ObjectManagment";
import { tableDependency } from "../../../table-dependency/TableDependency";
import { fieldDOM } from "../../form/ElementsInput";
import { createFrame } from "../ElementFrame";
import { frameEvent } from "../FrameEvent";
import { frameValues } from "../FrameValues";

export function createFrameBlock(frame:frame){
    
    managmentObject.frame.configFieldBlock(frame)
    
    const frameElement = createFrame(frame)
    
    const div = document.createElement("div");
    
    div.classList.add("r-q-i")
    if(frame.vertical){
        div.style.flexDirection = "column"
    }
    
    frame.fields?.forEach(field => {
                
        let fieldElement = fieldDOM.create(field)
        
        div.appendChild(fieldElement)

    })

    frameValues.setValuesDefined(frame, div);
    frameElement.appendChild(div)
    
    if(frame.requerid == false){
        tableDependency.moveNotResolvedToImbernate(frame.alias)
        frameEvent.managedFrame(div)
        frameEvent.cleanRequeridDependency(div)
    }

    return frameElement
}