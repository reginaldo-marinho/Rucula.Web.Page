import { Button } from "../../buttons/Button";
import { constFrameLineActions, constIdBaseWindow } from "../../const";
import { frame } from "../../entities/form/frame";
import { KeyEventAdd, KeyEventClear, KeyEventGetIndex } from "../../global/KeyEvents";
import { ManagmentObject } from "../../object/ObjectManagment";
import { Field } from "../form/Field";
import { FieldMenuContext } from "../form/Field/fieldMenuContext";
import { FameLineTable } from "../table/ElementsTable";
import { FrameElement } from "./FrameElement";
import { FrameEvent } from "./FrameEvent";

export class FrameElementLine extends FrameElement{
    
    public fameLineTable:FameLineTable

    constructor(managmentObject:ManagmentObject, field:Field, frameEvent:FrameEvent,button:Button,fieldMenuContext:FieldMenuContext,P:string) {
        super(managmentObject, field, frameEvent, button,fieldMenuContext);
        this.fameLineTable = new FameLineTable(managmentObject,field,this,frameEvent,this.setValuesDefined,fieldMenuContext,P)
    }    

    private createTDActions(identity:string){

        const div = document.createElement('div') as HTMLDivElement
        div.setAttribute('id', identity);
        div.setAttribute('class', 'f-l-actions r-text-nowrap');

        div.innerHTML = `<a class="add" id=${constFrameLineActions.ADD}><i class="bi bi-plus-lg"></i></a>
            <a class="remove" id=${constFrameLineActions.REMOVE}><i class="bi bi-trash"></i></a>`
       
            this.eventActions(div)
        
        return div
    }
    
    create(frame:frame){     

        const frameLine = this.createbase(frame)
        
        const table = document.createElement('table');
        table.classList.add("f-t-line")
    
        let title = frameLine.querySelector('h3')!
        
        const rowHeader = this.fameLineTable.createHeader(frame)

        let thTitle = rowHeader.querySelector('th')!
        thTitle.appendChild(title)
        
        table.appendChild(rowHeader)
        
        const tbody = document.createElement('tbody')

        const rowDetail = this.fameLineTable.createRowDetail(frame, this.inputValueSnapshot)
        
        let td = this.fameLineTable.getCellActions(rowDetail)
        
        td?.appendChild(this.createTDActions(frame.identity))
        
        tbody.appendChild(rowDetail)
        table.appendChild(tbody)
        frameLine.appendChild(table)
        
        this.eventKeyDownKeyUpLineFrame(rowDetail)

        return frameLine
    }


    currentLineElement?:HTMLElement
    inputTargetEvent?:HTMLInputElement

    createNewLine(currentLineElement:HTMLTableRowElement,element:HTMLElement){
        
        let field =  this.managmentObject.fragment.fields_getForIdentity(element.getAttribute("identity")!)    
        let newline = this.fameLineTable.createNewRowDetail(field.config.fragmentObjectIdentity)
        currentLineElement.after(newline);

    }

    deleteLine(currentLineElement:HTMLTableRowElement,element:HTMLInputElement){
        
        this.fameLineTable.deleteRowDetail(currentLineElement,element);
    }

    crudLineQuadro(event:Event){

        const key = (event as KeyboardEvent).key;
        KeyEventAdd(key)

        let nextLine = null;
        let previousLine = null;

        this.inputTargetEvent = event.target as HTMLInputElement
        this.currentLineElement = (event.currentTarget as HTMLElement)

        let identity = this.inputTargetEvent.getAttribute("identity")

        let inputs = this.currentLineElement.querySelectorAll('input')

        let positionInput = 0;

        for (let index = 0; index < inputs.length; index++) {
            
            if (inputs[index].getAttribute("identity") == identity){

                positionInput = index
                break
            }
        }

        if(KeyEventGetIndex(0) == "ArrowUp"){
            
            event.preventDefault();

            previousLine = (this.currentLineElement.previousSibling as HTMLTableRowElement)

            let inputs = previousLine?.querySelectorAll('input')
            
            if(inputs){
                inputs[positionInput]?.focus()
            }
        }

        if(KeyEventGetIndex(0) == "ArrowDown"){
            
            event.preventDefault();
            nextLine = (this.currentLineElement.nextSibling as HTMLTableRowElement)
            
            let inputs = nextLine?.querySelectorAll('input')
            
            if(inputs){
                inputs[positionInput]?.focus()
            }
        }

        if (KeyEventGetIndex(0) == undefined || KeyEventGetIndex(1) == undefined){
            return
        } 

        if (KeyEventGetIndex(0) == "Control" && KeyEventGetIndex(1) ==  "Enter"){
            event.preventDefault();
            this.createNewLine(this.currentLineElement as HTMLTableRowElement,this.inputTargetEvent)
        }
        if (KeyEventGetIndex(0) == "0" && KeyEventGetIndex(1) == "Control"){
            event.preventDefault();
            this.deleteLine(this.currentLineElement as HTMLTableRowElement,this.inputTargetEvent)
        }
        
        KeyEventClear();
    }

    eventActions (actions:HTMLDivElement) {

        let add = actions.querySelector(`#${constFrameLineActions.ADD}`)
        let remove = actions.querySelector(`#${constFrameLineActions.REMOVE}`)
        
        add?.addEventListener('click',(e) => {
            let  params = TRAndInput(e)
            this.createNewLine(params.tr,params.input)

        })

        remove?.addEventListener('click',(e) => {

            let  params = TRAndInput(e)
            this.deleteLine(params.tr,params.input)

        })

        function TRAndInput(e:Event){
            let anchor = (e as Event).currentTarget as HTMLAnchorElement
            
            let td = anchor?.parentElement?.parentElement // a <- div <- td 

            let tr = td?.parentElement as HTMLTableRowElement // td <- tr

            let input = (td?.nextSibling as HTMLTableCellElement)?.querySelector('input,select') as HTMLInputElement

            return {
                tr:tr,
                input:input
            }
        }
    }

    eventKeyDownKeyUpLineFrame (element:HTMLElement) {
        element.addEventListener('keydown',(event)=> {
            const key = (event as KeyboardEvent).key;
            KeyEventAdd(key)
            
            this.crudLineQuadro(event)
        })
        element.addEventListener('keyup',(event)=> {
            KeyEventClear();
        })
    }

    addActionsInCell(tr:HTMLTableRowElement,identity:string) {

        
        let tdActions = tr.querySelector('td')
        
        let fragmentObject =  this.managmentObject.getFragmentForIdentity(identity)
        
        tr.addEventListener('mouseover',(e) => {

            let actions = document.getElementById(fragmentObject.config.fragmentObjectIdentity) as HTMLDivElement
            
            tdActions?.appendChild(actions)

        })
    }
}