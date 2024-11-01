import { field } from "../../../entities/form/field";
import { MenuContext } from "../../../menu-context/menu-context";
import { Popup } from "../../../popup/popup";
export declare class FieldMenuContext {
    constructor(popup: Popup, menuContext: MenuContext, P: string);
    private P;
    private popup;
    private fieldsInfo;
    private lastDetail;
    private menuContext;
    init(): void;
    infoSet(fieldInfo: {
        identity: string;
        field: field;
    }): void;
    infoGet(identity: string): {
        identity: string;
        field: field;
    };
}
