import { TypeIcon } from "./ComponentTypes";
import { DOMComponent } from "./IComponent";
export declare class ComponentIconButton implements DOMComponent<HTMLElement, TypeIcon> {
    constructor(propert: TypeIcon);
    propert: TypeIcon;
    create(): HTMLElement;
}
