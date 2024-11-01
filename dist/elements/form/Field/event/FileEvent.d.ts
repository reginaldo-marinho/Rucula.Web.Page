import { field } from "../../../../entities/form/field";
import { ManagmentObject } from "../../../../object/ObjectManagment";
import { WindowBaseDOM } from "../../../window-base/WindowBase";
export declare abstract class FileEvent {
    protected input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    protected field: field;
    protected ruculaForm: any;
    protected managmentObject: ManagmentObject;
    constructor(managmentObject: ManagmentObject, input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, field: field, windowBaseDOM: WindowBaseDOM);
    dispatchEvent(prefixEvent: string): void;
    protected abstract setEventListener(): void;
    protected set(): void;
}
