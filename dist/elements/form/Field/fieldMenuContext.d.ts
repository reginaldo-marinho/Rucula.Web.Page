import { field } from "../../../entities/form/field";
import { Popup } from "../../../popup/popup";
export declare class FieldMenuContext {
    constructor(popup: Popup, P: string);
    private P;
    private popup;
    private fieldsInfo;
    private lastDetail;
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
