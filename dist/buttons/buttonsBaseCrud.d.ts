export declare class ButtonsBase {
    buttonCreate: HTMLButtonElement;
    buttonAlter: HTMLButtonElement;
    buttonDelete: HTMLButtonElement;
    buttonsPlus: HTMLButtonElement;
    olButtonsPlus: HTMLOListElement;
    P: string;
    constructor(P: string);
    initButtonsTypeCrudDefault(): void;
    initButtonPlus(): void;
    clickCreate(): void;
    clickAlter(): void;
    clickDelete(): void;
    removeCreate(): void;
    removeAlter(): void;
    removeDelete(): void;
    crud(crud: string): void;
}
