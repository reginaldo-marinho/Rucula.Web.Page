import { ManagmentObject } from "../object/ObjectManagment";
export declare class URLRucula {
    private _URL?;
    private managmentObject;
    constructor(managmentObject: ManagmentObject, URL?: {
        absolute: string;
        relative: string;
        params: string;
    });
    getURL(): string;
    domain(env?: string): string;
    path(path: string): string;
    private createWithParams;
    private createWithoutParams;
}
