interface IComponent {
}
export interface DOMComponent<TReturn, TPropert> extends IComponent {
    propert: TPropert;
    create(): TReturn;
}
export {};
