import { MenuContext } from "../../menu-context/menu-context";
import { FieldMenuContext } from "../form/Field/fieldMenuContext";
export declare class WindowBaseDOM {
    private fieldMenuContext;
    private menuContext;
    private P;
    constructor(fieldMenuContext: FieldMenuContext, menuContext: MenuContext, prefix: string);
    private elementRoot;
    createWindowBase(id: string): void;
    createNameWindow(name: string): void;
    componentActions(): Node;
    createComponentCreateOrEdit(): Node;
    prepareEventsButtonsCrud(): void;
    openCloseContainer(): void;
    closeLeftGrid(grid: boolean): void;
    maximizeWindow(): void;
    eraseWindow(ruculaWindow: HTMLDivElement): void;
    actionCrudpreventDefault(): void;
    openActionswindow(): void;
    alterTheme(): void;
    setElementRoot(id: string): void;
    getElementRoot(): HTMLElement;
    getPrincipalElementRucula(): HTMLFormElement;
}
