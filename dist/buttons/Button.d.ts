import { button } from '../entities/form/button';
import { ElementStrategy } from './ElementEstrategy';
import { Popup } from '../popup/popup';
export declare class Button {
    private callbackReaload;
    popup: Popup;
    P: string;
    constructor(callbackReaload: () => void, popup: Popup, P: string);
    elementStrategy: ElementStrategy;
    buttonIsNotDefault(target: string): boolean;
    createButtonOrLink(button: button): HTMLButtonElement | HTMLAnchorElement;
    private getButton;
    prepareLocalizations(): void;
    prepareEnviroments(): void;
    prepareButtonsInLeftBox(button: button[]): void;
    disable(target: string): void;
    enable(target: string): void;
    hide(target: string): void;
    destroy(target: string): void;
}
