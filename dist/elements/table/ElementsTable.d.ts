import { frame } from "../../entities/form/frame";
import { ManagmentObject } from "../../object/ObjectManagment";
import { Field } from "../form/Field";
import { FieldMenuContext } from "../form/Field/fieldMenuContext";
import { FrameElementLine } from "../frame/FrameElementLine";
import { FrameEvent } from "../frame/FrameEvent";
export declare class FameLineTable {
    private managmentObject;
    private field;
    private frameEvent;
    private frameElementLine;
    private callbackSetValuesDefined;
    private fieldMenuContext;
    constructor(managmentObject: ManagmentObject, field: Field, frameElementLine: FrameElementLine, frameEvent: FrameEvent, callbackSetValuesDefined: any, fieldMenuContext: FieldMenuContext);
    getCellActions(tr: HTMLTableRowElement): HTMLTableCellElement;
    createHeader(frame: frame): HTMLTableSectionElement;
    createRowDetail(frame: frame): HTMLTableRowElement;
    createNewRowDetail(identityObject: string): HTMLTableRowElement;
    deleteRowDetail(currentLineElement: HTMLTableRowElement, inputTargetEvent: HTMLInputElement): void;
}
