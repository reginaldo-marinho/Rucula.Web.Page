import { Button } from "../../buttons/Button";
import { constTypeFrame } from "../../const";
import { frame } from "../../entities/form/frame";
import { ManagmentObject } from "../../object/ObjectManagment";
import { Field } from "../form/Field";
import { FieldMenuContext } from "../form/Field/fieldMenuContext";
import { FrameEvent } from "./FrameEvent";

export type typeInputSnapshot = {element:HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement, value:any}

export class FrameElement{

    protected managmentObject:ManagmentObject 
    protected field:Field
    protected frameEvent:FrameEvent
    protected button:Button
    protected fieldMenuContext:FieldMenuContext
    protected inputValueSnapshot:typeInputSnapshot[] = []

    constructor(managmentObject:ManagmentObject,field:Field,frameEvent:FrameEvent, button:Button,fieldMenuContext:FieldMenuContext) {
        this.managmentObject = managmentObject
        this.field = field
        this.frameEvent = frameEvent
        this.button =  button
        this.fieldMenuContext = fieldMenuContext
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

    public revertToInit(){

        for (let index = 0; index < this.inputValueSnapshot.length; index++) {
            
            this.inputValueSnapshot[index].element.value = this.inputValueSnapshot[index].value
        }
    }
}