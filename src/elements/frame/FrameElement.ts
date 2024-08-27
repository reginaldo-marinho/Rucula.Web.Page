import { constTypeFrame } from "../../const";
import { frame } from "../../entities/form/frame";
import { ManagmentObject } from "../../object/ObjectManagment";
import { FieldDOM } from "../form/ElementsInput";
import { FrameEvent } from "./FrameEvent";

export class FrameElement{

    protected managmentObject:ManagmentObject 
    protected fieldDOM:FieldDOM
    protected frameEvent:FrameEvent
    constructor(managmentObject:ManagmentObject,fieldDOM:FieldDOM,frameEvent:FrameEvent) {
        this.managmentObject = managmentObject
        this.fieldDOM = fieldDOM
        this.frameEvent = frameEvent
    }
    
    protected createbase(frame:frame){

        const div = document.createElement('div');
        
        div.style.gridColumnStart = `${frame.layout.col.start}`
        div.style.gridColumnEnd = `${frame.layout.col.end}`
    
        div.style.gridRowStart = `${frame.layout.row.start}`
        div.style.gridRowEnd = `${frame.layout.row.end}`
    
        if(frame.type == constTypeFrame.BLOCK){
            div.classList.add("r-q-b")
        }
        
        if(frame.type == constTypeFrame.LINE){
            div.classList.add('r-q-l')
        }
            
        div.setAttribute('identity',frame.identity)
        
        const h3 = document.createElement('h3');
        h3.textContent = frame.name
        h3.classList.add('r-t-f')
        div.appendChild(h3)
    
        if(frame?.style?.width) div.style.width = frame.style.width
        if(frame?.style?.height) div.style.height = frame.style.height
        
        return div
    }

    protected setValuesDefined (frame:frame, htmlElement:HTMLElement){

        frame.fields?.forEach(field => {

            let input = htmlElement.querySelector(field.identity) as HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement
            
            if(input){
                this.managmentObject.setValueContextIdentity(field.identity,field.type, input.value);
            }
        })
    }
}