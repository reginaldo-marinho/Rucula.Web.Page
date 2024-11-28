import { field } from "../../../../entities/form/field";
import { ManagmentObject } from "../../../../object/ObjectManagment";
import { eventsCustom } from "../../Field/EventsFieldsCustom";

export abstract class FileEvent{
    
    protected input: HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement
    protected field: field //? This property is used to support some events
    
    
    protected ruculaForm

    protected managmentObject:ManagmentObject
    constructor(managmentObject:ManagmentObject, input: HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement,field: field,ruculaForm:HTMLElement) {

        this.ruculaForm = ruculaForm
        this.managmentObject = managmentObject
        this.input = input
        this.field = field
        this.setEventListener()
    }

    dispatchEvent(prefixEvent:string){

        let identity = this.input.getAttribute("identity")!;
        
        let fragment = this.managmentObject.getFragmentForIdentity(identity)
         
        let eventName = fragment.config.line ? `${prefixEvent}.${fragment.config.alias}.${fragment.config.propertDto}.${fragment.config.line}` : `${prefixEvent}.${fragment.config.alias}.${fragment.config.propertDto}`
        
        let event = eventsCustom.field().get(eventName)
        
        this.ruculaForm?.dispatchEvent(event)
        
    }
    
    protected abstract setEventListener():void;
    
    protected set(): void {

        let identity = this.input.getAttribute("identity")!

        this.managmentObject.setValueContextIdentity(identity,this.field?.type, this.input.value)
    }
}  