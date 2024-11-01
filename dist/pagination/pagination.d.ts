import { WindowBaseDOM } from "../elements/window-base/WindowBase";
export declare class PaginationEvents {
    windowBaseDOM: WindowBaseDOM;
    constructor(windowBaseDOM: WindowBaseDOM);
    headerSearch(gridSearch: boolean): void;
    fotter(gridFooter: boolean): void;
}
