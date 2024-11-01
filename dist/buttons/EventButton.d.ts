import { button } from '../entities/form/button';
import { Field } from '../elements/form/Field';
import { WindowBaseDOM } from '../elements/window-base/WindowBase';
import { ManagmentObject } from '../object/ObjectManagment';
export declare class EventButton {
    field: Field;
    managmentObject: ManagmentObject;
    windowBaseDOM: WindowBaseDOM;
    P: string;
    constructor(field: Field, managmentObject: ManagmentObject, windowBaseDOM: WindowBaseDOM, P: string);
    eventButton(pathController: string, buttons: button[]): void;
    openCloseRightListButtons(): void;
}
