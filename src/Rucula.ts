import { window } from "./entities/form/window";
import { windowBaseDOM } from "./elements/window-base/WindowBase";
import { constIdBaseWindow, constTypeFrame } from "./const";
import { EventButton } from "./buttons/EventButton";
import { configWindow } from "./window/Window";
import { defaultValues } from "./elements/Defaults";
import { LayoutFrame } from "./Layout/layout";
import { buttonsBase } from "./buttons/buttonsBaseCrud";
import { globalConfiguration } from "./global/entities/GlobalConfiguration";
import { ruculaGlobal } from "./global/GlobalConfig";
import { loaderManagment } from "./elements/loader/loader";
import { Popup } from "./popup/popup";
import { RuculaLogs } from "./console/Console";
import { EventManagment } from "./Event/event";
import { exportPaginationEvents } from "./exports";
import { URLRucula } from "./URL/urlManagment";
import { FrameElementBlock } from "./elements/frame/FrameElementBlock";
import { FrameElementLine } from "./elements/frame/FrameElementLine";
import { ManagmentObject } from "./object/ObjectManagment";
import { TableDependency } from "./table-dependency/TableDependency";
import { Fragment } from "./fragment/fragment";
import { Field } from "./elements/form/Field";
import { FrameEvent } from "./elements/frame/FrameEvent";
import { Button } from "./buttons/Button";

export class Rucula{
    
    private window: window
    private elementRucula: HTMLElement
    private elementFormRucula!: HTMLFormElement
    public popup:Popup
    public event:EventManagment
    public managmentObject:ManagmentObject
    public tableDependency:TableDependency
    private button:Button
    private layoutFrame:LayoutFrame
    private fragment: Fragment
    private field:Field
    private eventButton:EventButton
    private frameEvent:FrameEvent
    private config:any
    
    constructor(config: {
        global:globalConfiguration, 
        window:window, 
        id:string|undefined,
        reload?:() => void
    }){
        config.id ??= 'rucula-js';
        ruculaGlobal.initGlobalConfiguration(config.global)
        windowBaseDOM.setElementRoot(config.id)
        this.window = config.window
        this.elementRucula = document.getElementById(config.id)!
        this.popup = new Popup()
        this.layoutFrame = new LayoutFrame()
        this.fragment = new Fragment();
        this.tableDependency = new TableDependency();
        this.managmentObject = new ManagmentObject(this.fragment, this.tableDependency);
        this.event = new EventManagment(this.managmentObject);
        this.field = new Field(this.managmentObject)
        this.eventButton = new EventButton(this.field, this.managmentObject)
        this.frameEvent = new FrameEvent(this.managmentObject)

        this.button = new Button(() => {
            let rucula = new Rucula(config)
            rucula.create()
            this.config?.reload()
        })
    }

    create(){
        this.cleanRucula();
        let eventInit = new Event('rucula.init')
        let eventLoad = new Event('rucula.load')
        
        let rucula = windowBaseDOM.getElementRoot()
        rucula.dispatchEvent(eventInit)
        configWindow.set(this.window)
        defaultValues.setDefault(this.window)
        windowBaseDOM.createWindowBase(this.elementRucula.id)
        this.addHomeWindow();
        this.managmentObject.initObjects(this.window.frames)
        windowBaseDOM.createNameWindow(this.window.name)
        windowBaseDOM.closeLeftGrid(this.window.grid)
        this.elementFormRucula = windowBaseDOM.getPrincipalElementRucula() as HTMLFormElement
        exportPaginationEvents.headerSearch(this.window.gridSearch);
        exportPaginationEvents.fotter(this.window.gridFooter);
        this.layoutFrame.configureLayout(this.window)
        this.createFrames()
        this.createButtons()
        buttonsBase.initButtonsTypeCrudDefault();
        buttonsBase.initButtonPlus();
        buttonsBase.buttonsTypeCrud.crud(this.window?.crud);        
        rucula.dispatchEvent(eventLoad);
        
        (window as any).rucula = new RuculaLogs(this.managmentObject);
    }

    private addHomeWindow(){
     
        if(this.window?.iconHome){
            
            let icon = document.getElementById("r-f-home-icon")!
            icon?.classList.add(this.window.iconHome)
        }

        if(this.window?.messageHome){
        
            let title = document.getElementById("r-f-home-title")!
            title.textContent = this.window?.messageHome
        }
        
        let titles = document.querySelectorAll(`.${constIdBaseWindow.TITLE}`)
        titles?.forEach(title => {
            title.textContent = this.window.name
        })
    }
    
    reload(callback:any){
        callback()
    }

    private cleanRucula(){
        for (let index = 0; index < this.elementRucula.childNodes.length; index++) {            
            this.elementRucula.childNodes[index].remove();
        }
    }

    private createButtons(type:string="CRUD"){

        if(type == "CRUD"){
            this.button.prepareButtonsInLeftBox(this.window.button)
        }
        this.eventButton.eventButton(this.window.pathController, this.window.button)
        this.eventButton.openCloseRightListButtons()
    }

    private createFrames(){
        
        let frameBlock = new FrameElementBlock(this.managmentObject,this.field, this.frameEvent, this.button);
        let frameLine = new FrameElementLine(this.managmentObject,this.field,this.frameEvent, this.button);

        this.window.frames?.forEach(frame => {
            
            if(frame.type == constTypeFrame.BLOCK){

                const block = frameBlock.create(frame)
                this.elementFormRucula.appendChild(block)
                eventCreated(block) 
            }
            
            if(frame.type == constTypeFrame.LINE){
                            
                const line = frameLine.create(frame)
                this.elementFormRucula.appendChild(line)
                eventCreated(line)
            }  
            
            function eventCreated(frameElement:HTMLDivElement){
                
                var eventName = `frame.${frame.alias}.complete`
                let event = new CustomEvent(eventName, {
                    detail: {

                        element: frameElement,
                        height: frameElement.offsetHeight,
                        width: frameElement.offsetWidth
                    }
                })
                let rucula = windowBaseDOM.getElementRoot();
                
                rucula.dispatchEvent(event)
            }
        })
    }

    public loader = loaderManagment

    public url = (URL?: { absolute: string; relative: string; params: string; }) => new URLRucula(this.managmentObject, URL);
            
    objectUnique (alias:string) {
        return this.managmentObject.objectUnique(alias)
    } 

    getFullObject(){
        return this.managmentObject.objectFull()
    } 
        
    getSepareteObject(){
        return this.managmentObject.objectSeparate()
    } 

    setValue (targetPath:string, value: any)  {
        
        const ATTR_DISABLED = 'disabled'
        let identity = this.managmentObject.convertAliasToIdenty(targetPath);

        let input = document.querySelector('[identity='+identity+']') as HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement

        let disabled = input.getAttribute(ATTR_DISABLED) == null ?  null : ATTR_DISABLED

        let frag = this.fragment.fields_getForIdentity(identity)

        if(disabled){
            input.removeAttribute(ATTR_DISABLED)
        }
        
        input.value = value
        input.focus({preventScroll: true}) //! This command forces the objectmanagment and tableDependecy processes to run
        input.blur()
        
        if(disabled){
            input.setAttribute(ATTR_DISABLED,'')
        }
    }
    
    getValue (config:string):any {
        return this.managmentObject.getPropert(config)
    }
}
