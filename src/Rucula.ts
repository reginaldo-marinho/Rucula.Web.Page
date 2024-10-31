import { window } from "./entities/form/window";
import { WindowBaseDOM } from "./elements/window-base/WindowBase";
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
import { URLRucula } from "./URL/urlManagment";
import { FrameElementBlock } from "./elements/frame/FrameElementBlock";
import { FrameElementLine } from "./elements/frame/FrameElementLine";
import { ManagmentObject } from "./object/ObjectManagment";
import { TableDependency } from "./table-dependency/TableDependency";
import { Fragment } from "./fragment/fragment";
import { Field } from "./elements/form/Field";
import { FrameEvent } from "./elements/frame/FrameEvent";
import { Button } from "./buttons/Button";
import { FieldMenuContext } from "./elements/form/Field/fieldMenuContext";
import { PaginationEvents } from "./pagination/pagination";

export class Rucula{
    
    public  prefix = `ruculajs_${Date.now()}`

    private windowBaseDOM!:WindowBaseDOM
    private window: window
    private elementRucula: HTMLElement
    private elementFormRucula!: HTMLFormElement
    public popup:Popup
    public event:EventManagment
    public managmentObject:ManagmentObject
    private tableDependency:TableDependency
    private button:Button
    private layoutFrame:LayoutFrame
    private fragment: Fragment
    private field:Field
    private eventButton:EventButton
    private frameEvent:FrameEvent
    private config:any
    private fieldMenuContext:FieldMenuContext
    private paginationEvents:PaginationEvents
    constructor(config: {
        global:globalConfiguration, 
        window:window, 
        id:string|undefined,
        reload?:() => void
    }){
        config.id ??= 'rucula-js';
        ruculaGlobal.initGlobalConfiguration(config.global)
        
        this.window = config.window
        this.elementRucula = document.getElementById(config.id)!
        this.popup = new Popup(this.prefix)
        this.fieldMenuContext= new FieldMenuContext(this.popup)
        this.windowBaseDOM = new WindowBaseDOM(this.fieldMenuContext)
        this.windowBaseDOM.setElementRoot(config.id)
        this.layoutFrame = new LayoutFrame(this.windowBaseDOM)
        this.fragment = new Fragment();
        this.tableDependency = new TableDependency();
        this.managmentObject = new ManagmentObject(this.fragment, this.tableDependency);
        this.event = new EventManagment(this.managmentObject,this.windowBaseDOM);
        this.field = new Field(this.managmentObject, this.windowBaseDOM)
        this.eventButton = new EventButton(this.field, this.managmentObject, this.windowBaseDOM)
        this.frameEvent = new FrameEvent(this.managmentObject)
        this.paginationEvents = new PaginationEvents(this.windowBaseDOM)
        
        this.button = new Button(() => {
            let rucula = new Rucula(config)
            rucula.create()
            this.config?.reload()
        }, this.popup)
    }

    create(){
        this.cleanRucula();
        let eventInit = new Event('rucula.init')
        let eventLoad = new Event('rucula.load')
        
        let rucula = this.windowBaseDOM.getElementRoot()
        rucula.dispatchEvent(eventInit)
        configWindow.set(this.window)
        defaultValues.setDefault(this.window)
        this.windowBaseDOM.createWindowBase(this.elementRucula.id)
        this.addHomeWindow();
        this.managmentObject.initObjects(this.window.frames)
        this.windowBaseDOM.createNameWindow(this.window.name)
        this.windowBaseDOM.closeLeftGrid(this.window.grid)
        this.elementFormRucula = this.windowBaseDOM.getPrincipalElementRucula() as HTMLFormElement
        this.paginationEvents.headerSearch(this.window.gridSearch);
        this.paginationEvents.fotter(this.window.gridFooter);
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
        
        let frameBlock = new FrameElementBlock(this.managmentObject,this.field, this.frameEvent, this.button, this.fieldMenuContext);
        let frameLine = new FrameElementLine(this.managmentObject,this.field,this.frameEvent, this.button, this.fieldMenuContext);

        this.window.frames?.forEach(frame => {
            
            if(frame.type == constTypeFrame.BLOCK){

                const block = frameBlock.create(frame)
                this.elementFormRucula.appendChild(block)
                eventCreated(block,this.windowBaseDOM.getElementRoot()) 
            }
            
            if(frame.type == constTypeFrame.LINE){
                            
                const line = frameLine.create(frame)
                this.elementFormRucula.appendChild(line)
                eventCreated(line,this.windowBaseDOM.getElementRoot())
            }  
            
            function eventCreated(frameElement:HTMLDivElement, elementRoot: HTMLElement){
                
                var eventName = `frame.${frame.alias}.complete`
                let event = new CustomEvent(eventName, {
                    detail: {

                        element: frameElement,
                        height: frameElement.offsetHeight,
                        width: frameElement.offsetWidth
                    }
                })
                let rucula = elementRoot
                
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
