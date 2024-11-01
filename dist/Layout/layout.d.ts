import { WindowBaseDOM } from "../elements/window-base/WindowBase";
import { window } from "../entities/form/window";
export declare class LayoutFrame {
    windowBaseDOM: WindowBaseDOM;
    P: string;
    constructor(windowBaseDOM: WindowBaseDOM, P: string);
    configureLayout(window: window): void;
    private setGridContainer;
}
