import { FieldMenuContext } from "../form/Field/fieldMenuContext";
export declare class WindowBaseDOM {
    private fieldMenuContext;
    private P;
    constructor(fieldMenuContext: FieldMenuContext, prefix: string);
    private elementRoot;
    createWindowBase(id: string): void;
    createNameWindow(name: string): void;
    componentActions(): Node;
    createComponentCreateOrEdit(): Node;
    prepareEventsButtonsCrud(): void;
    openCloseContainer(): void;
    closeLeftGrid(grid: boolean): void;
    maximizeWindow(): void;
    eraseWindow(): void;
    actionCrudpreventDefault(): void;
    openActionswindow(): void;
    alterTheme(): void;
    setElementRoot(id: string): void;
    getElementRoot(): HTMLElement;
    getPrincipalElementRucula(): HTMLFormElement;
}
