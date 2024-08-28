import { field } from "../../../entities/form/field";
import { ManagmentObject } from "../../../object/ObjectManagment";
export declare abstract class FieldInput {
    protected managmentObject: ManagmentObject;
    protected floatLabel: boolean;
    protected field: field;
    input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    constructor(field: field, managmentObject: ManagmentObject);
    protected abstract create(): void;
    protected abstract setEvents(): void;
    protected setWidth(): void;
    exec(): void;
}
