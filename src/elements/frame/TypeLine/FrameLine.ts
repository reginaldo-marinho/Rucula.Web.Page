import { constFrameLineActions } from "../../../const";
import { frame } from "../../../entities/form/frame";
import { managmentObject } from "../../../object/ObjectManagment";
import { tableDependency } from "../../../table-dependency/TableDependency";
import { frameLineTableDOM } from "../../table/ElementsTable";
import { createFrame } from "../ElementFrame";
import { FrameLineEventDOM } from "./FrameLineEvent";

export let frameLineDOM =  (() => {

    function createTDActions(identity:string){

        const div = document.createElement('div') as HTMLDivElement
        div.setAttribute('id', identity);
        div.setAttribute('class', 'f-l-actions r-text-nowrap');

        div.innerHTML = `<a class="add" id=${constFrameLineActions.ADD}><i class="bi bi-plus-lg"></i></a>
            <a class="remove" id=${constFrameLineActions.REMOVE}><i class="bi bi-trash"></i></a>`
       
        FrameLineEventDOM.eventActions(div)
        
        return div
    }
    
    function createFrameLine(frame:frame){
    
        let newFrame = Object.create(frame) as frame
        
        managmentObject.frame.init.addLine(newFrame)

        const frameLine = createFrame(frame)
        
        const table = document.createElement('table');
        table.classList.add("f-t-line")
    
        const rowHeader = frameLineTableDOM.table.header.createHeader(frame)
    
        table.appendChild(rowHeader)
        
        const tbody = document.createElement('tbody')

        const rowDetail = frameLineTableDOM.table.detail.createRowDetail(newFrame)
        
        let td = frameLineTableDOM.table.detail.getCellActions(rowDetail)
        
        td?.appendChild(createTDActions(frame.identity))
        
        tbody.appendChild(rowDetail)
        table.appendChild(tbody)
        frameLine.appendChild(table)
        
        FrameLineEventDOM.eventKeyDownKeyUpLineFrame(rowDetail)
        
        if(frame.requerid == false){
            tableDependency.moveNotResolvedToImbernate(frame.identity)
        }
        
        return frameLine
    }
    
    
    return {
        createFrameLine: (frame:frame) => {
            return createFrameLine(frame)
        },
        addLine: (identity:string) => {
            return  frameLineTableDOM.table.detail.createNewRowDetail(identity)
        },
        removeLine:(currentLineElement:HTMLTableRowElement,inputTargetEvent:HTMLInputElement) => {
            frameLineTableDOM.table.detail.deleteRowDetail(currentLineElement,inputTargetEvent)
        }
    }
})()
