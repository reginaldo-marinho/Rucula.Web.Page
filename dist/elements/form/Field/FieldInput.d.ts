import { field } from "../../../entities/form/field";
import { ManagmentObject } from "../../../object/ObjectManagment";
import { WindowBaseDOM } from "../../window-base/WindowBase";
export declare abstract class FieldInput {
    protected managmentObject: ManagmentObject;
    protected floatLabel: boolean;
    protected field: field;
    input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    protected windowBaseDOM: WindowBaseDOM;
    constructor(field: field, managmentObject: ManagmentObject, windowBaseDOM: WindowBaseDOM);
    protected abstract create(): void;
    protected abstract setEvents(): void;
    protected setWidth(): void;
    exec(): void;
}
