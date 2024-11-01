import { WindowBaseDOM } from "../elements/window-base/WindowBase";
import { ManagmentObject } from "../object/ObjectManagment";
export declare class EventManagment {
    private managmentObject;
    private windowBaseDOM;
    constructor(managmentObject: ManagmentObject, windowBaseDOM: WindowBaseDOM);
    getFieldDetails(event: CustomEvent): {
        identity: string;
        name: any;
        row: any;
        value: any;
        targetPathWithRow: (targetPath: string) => string;
    };
    on(event: string, callback: any, query?: string): void;
}
