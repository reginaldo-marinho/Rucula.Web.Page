import { field } from "../../entities/form/field";
import { ManagmentObject } from "../../object/ObjectManagment";
import { WindowBaseDOM } from "../window-base/WindowBase";
export declare class Field {
    private managmentObject;
    windowBaseDOM: WindowBaseDOM;
    constructor(managmentObject: ManagmentObject, windowBaseDOM: WindowBaseDOM);
    createSpanLabelIsRequerid(): HTMLSpanElement;
    createGroupOfButton(element: HTMLButtonElement | HTMLAnchorElement): HTMLDivElement;
    createGroupOfInput(field: field, element: HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement): HTMLDivElement;
    checkTypeField(type: string | string[2]): void;
    isSimple(type: string): boolean;
    isTextArea(type: string): boolean;
    isSelect(type: string): boolean;
    create(field: field): HTMLInputElement | HTMLSelectElement;
    focusFieldsWithDependency(): void;
    cleanFocusDependency(input: HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement): void;
}
