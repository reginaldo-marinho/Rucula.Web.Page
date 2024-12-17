import { constTypeFrame, constTypeInput } from "../const";
import { field } from "../entities/form/field";
import { frame } from "../entities/form/frame";
import { window } from "../entities/form/window";

export let defaultValues = (() => {

    const configFrameDefault = {
        TYPE_FRAME: constTypeFrame.BLOCK,
        VERTICAL: true,
        REQUERID: true
    }

    const configInputDefault = {
        TYPE: constTypeInput.TEXT,
        REQUERID_TRUE: true,
        REQUERID_FALSE: false,
        DISABLE: false
    }
    
    function setDefaultFrame(frame: frame){

        frame.type ??= configFrameDefault.TYPE_FRAME
        frame.vertical ??= configFrameDefault.VERTICAL
        frame.requerid ??= configFrameDefault.REQUERID
    }
    
    function setDefaultInput(field: field){
            
        field.type ??= configInputDefault.TYPE
        field.disable ??= configInputDefault.DISABLE
        field.requerid ??= configInputDefault.REQUERID_FALSE 
    }
    
    return {
        setDefault:(window: window) => {
            
            if(!window){
                return
            }
            
            window.grid ??= true
            window.gridFooter ??= true
            window.gridSearch ??= true
            
            window.frames.forEach(frame => {
        
                setDefaultFrame(frame)

                frame.fields?.forEach(field => {
                    setDefaultInput(field)
                })
        
            })
        }
    }
})()

