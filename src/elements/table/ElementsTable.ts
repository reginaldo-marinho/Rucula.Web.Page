import { alignItem } from "../../Helpers/Helper";
import { field } from "../../entities/form/field";
import { frame } from "../../entities/form/frame";
import { ManagmentObject } from "../../object/ObjectManagment";
import { configWindow } from "../../window/Window";
import { FieldDOM } from "../form/ElementsInput";
import { fieldMenuContext } from "../form/Field/fieldMenuContext";
import { FrameElementLine } from "../frame/FrameElementLine";
import { FrameEvent } from "../frame/FrameEvent";

export class FameLineTable {
  
    private managmentObject:ManagmentObject 
    private fieldDOM:FieldDOM
    private frameEvent:FrameEvent
    private frameElementLine:FrameElementLine
    private callbackSetValuesDefined:any

    constructor(managmentObject:ManagmentObject,fieldDOM:FieldDOM, frameElementLine:FrameElementLine, frameEvent:FrameEvent, callbackSetValuesDefined:any) {
        this.managmentObject = managmentObject
        this.fieldDOM = fieldDOM
        this.frameEvent = frameEvent
        this.frameElementLine = frameElementLine
        this.callbackSetValuesDefined = callbackSetValuesDefined
    }

    getCellActions(tr:HTMLTableRowElement){
        return tr.querySelector('td') //? 
    }

    createHeader (frame:frame)  {
                                        
        let trColumns = document.createElement('tr')
        let trTitle = document.createElement('tr')
        
        let thTitle = document.createElement('th')
        trTitle.appendChild(thTitle)
        thTitle.style.textAlign = 'start'
        thTitle.classList.add('title')
        
        let thead = document.createElement('thead');
        
        thead.appendChild(trTitle);
        thead.appendChild(trColumns);
        
        const actions = document.createElement('th');
        trColumns.appendChild(actions)

        frame.fields?.forEach(field => {
            
            const th = document.createElement('th');
            th.textContent = field.description
            
            if(field.requerid == true){
                th.textContent = th.textContent
                th.append(this.fieldDOM.createSpanLabelIsRequerid().cloneNode(true))
            }
    
            alignItem(field,th)
            
            trColumns.appendChild(th)
        })
        
        let columnsLength = trColumns.querySelectorAll('th')
        
        thTitle.setAttribute('colspan',String(columnsLength.length))
        
        return thead as HTMLTableSectionElement;
    }

    createRowDetail(frame:frame) {
                    
        this.managmentObject.addLine(frame) //! This function must be started immediately at the beginning of line creation
        
        let tr = document.createElement('tr');
             
        const tdActions = document.createElement('td'); //? first td is used for actions line
        tdActions.setAttribute('ruc-action','')
        tr.appendChild(tdActions)

        if(frame.fields){
            this.frameElementLine.addActionsInCell(tr,frame.fields[0].identity)
        }

        frame.fields?.forEach((field:field) =>{
                    
            const td = document.createElement('td');

            const elementInput = this.fieldDOM.create(field) as HTMLInputElement; 
            
            td.appendChild(elementInput)
            
            var alignInInput = elementInput.getAttribute('type') != "checkbox"
        
            if(alignInInput){
                alignItem(field,elementInput)
            }
            if(alignInInput == false){
                alignItem(field,td)
            }

            tr.appendChild(td)

            fieldMenuContext.info.set({
                identity: field.identity,
                field: field
            })
        })

        let rowCount = this.managmentObject.count(frame.identity)

        this.callbackSetValuesDefined(frame, tr);
 
        if(frame.requerid == false && rowCount == 1){
            this.frameEvent.managedFrame(tr)
            this.frameEvent.cleanRequeridDependency(tr)
            this.managmentObject.tableDependency.moveNotResolvedToImbernate(frame.identity)
        }

        if(frame.requerid == false && rowCount > 1){
            this.managmentObject.tableDependency.moveImbernateToNotResolved(frame.identity)
        }

        return tr;
    }
    
    createNewRowDetail(identityObject: string){

        let frame = configWindow.frame.get(identityObject)

        const row = this.createRowDetail(frame)
        
        row.querySelector("input")?.focus()    
        
        this.frameElementLine.eventKeyDownKeyUpLineFrame(row)

        return row;
    }
    
    deleteRowDetail (currentLineElement:HTMLTableRowElement,inputTargetEvent:HTMLInputElement){
    
        let nextSibling:HTMLTableRowElement = currentLineElement.nextSibling as HTMLTableRowElement
        let previousSibling:HTMLTableRowElement = currentLineElement.previousSibling as HTMLTableRowElement;
        let Tbody = currentLineElement.parentNode!

        let rowElement = currentLineElement
        currentLineElement = rowElement
         
        let identityInputTartget = inputTargetEvent.getAttribute("identity")!

        let fragmentObject =  this.managmentObject.getFragmentForIdentity(identityInputTartget)

        let field = this.managmentObject.fragment.fields_getForIdentity(identityInputTartget)
            
        let frame = configWindow.frame.get(field.config.fragmentObjectIdentity)
        
        moveActions(fragmentObject.config.fragmentObjectIdentity,this.getCellActions)
        
        let count = this.managmentObject.count(frame.identity)
        
        let actions = currentLineElement.querySelector('td div') as HTMLDivElement
        
        currentLineElement.remove(); //! Importante! This call must be before object and fragment. Otherwise there will be unexpected errors. 
        this.managmentObject.removeLine(frame.identity,field.config.line as number)
        this.managmentObject.removeFragmentsLine(frame.identity,field.config.line as number)
        
        if(count <= 1){
            
            //! IMPORTANT! Note that the unremoved fragment can be used here, which is why it was not removed before
            
            let newLine =  this.createNewRowDetail(frame.identity);
            
            let tdActions = this.getCellActions(newLine)
            
            tdActions?.appendChild(actions)
            
            Tbody.appendChild(newLine)
            
            newLine?.querySelector("input")?.focus();
        }
        
        function moveActions(fragmentObject:string,getCellActionsCallback:any){
            
            let actions = document.getElementById(fragmentObject) as HTMLDivElement
            
            if(previousSibling){
                
                previousSibling?.querySelector("input")?.focus();
                
                let tdActions = getCellActionsCallback(previousSibling)
        
                tdActions?.appendChild(actions)
                return
            }

            if(nextSibling){
                nextSibling?.querySelector("input")?.focus();
                
                let tdActions = getCellActionsCallback(nextSibling)
            
                tdActions?.appendChild(actions)   
            }
        }
    }
}
  