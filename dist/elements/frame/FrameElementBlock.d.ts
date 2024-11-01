import { Button } from "../../buttons/Button";
import { frame } from "../../entities/form/frame";
import { ManagmentObject } from "../../object/ObjectManagment";
import { Field } from "../form/Field";
import { FieldMenuContext } from "../form/Field/fieldMenuContext";
import { FrameElement } from "./FrameElement";
import { FrameEvent } from "./FrameEvent";
export declare class FrameElementBlock extends FrameElement {
    constructor(managmentObject: ManagmentObject, field: Field, frameEvent: FrameEvent, button: Button, fieldMenuContext: FieldMenuContext);
    create(frame: frame): HTMLDivElement;
}
