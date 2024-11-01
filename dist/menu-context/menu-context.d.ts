export declare class MenuContext {
    P: string;
    constructor(P: string);
    menusContext: {
        id: string;
        element: HTMLDivElement;
    }[];
    elemetInFocu: HTMLElement;
    private createMenuContext;
    private findMenu;
    private addItem;
    private menuContextInput;
    elemetInFocus(): HTMLElement;
    init(): void;
}
