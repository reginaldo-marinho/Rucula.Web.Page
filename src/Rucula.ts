import { window } from "./entities/form/window";
import { WindowBaseDOM } from "./elements/window-base/WindowBase";
import { constIdBaseWindow, constTypeFrame } from "./const";
import { EventButton } from "./buttons/EventButton";
import { configWindow } from "./window/Window";
import { defaultValues } from "./elements/Defaults";
import { LayoutFrame } from "./Layout/layout";
import { ButtonsBase } from "./buttons/buttonsBaseCrud";
import { ruculaGlobal } from "./global/GlobalConfig";
import { LoaderManagment } from "./elements/loader/loader";
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
import { MenuContext } from "./menu-context/menu-context";
import { P as prefixe } from "./common/Prefixe";
import { buttonURL } from "./entities/form/button";
import { WindowAPI } from "./window/windowAPI";
import { ButtonManaged } from "./elements/window-base/buttonManaged";
import { globalConfiguration } from "./entities/global/GlobalConfiguration";

export class Rucula{
    
    private P = `ruculajs_${Date.now()}`
    private windowBaseDOM!:WindowBaseDOM
    private window!: window
    private globalWindow!: HTMLElement
    private elementFormRucula!: HTMLFormElement
    private menuContext!:MenuContext
    public popup!:Popup
    public event!:EventManagment
    public managmentObject!:ManagmentObject
    private tableDependency!:TableDependency
    private button!:Button
    private layoutFrame!:LayoutFrame
    private fragment!: Fragment
    private field!:Field
    private eventButton!:EventButton
    private frameEvent!:FrameEvent
    private config:any
    private fieldMenuContext!:FieldMenuContext
    private paginationEvents!:PaginationEvents
    private buttonsBase!:ButtonsBase
    private frameBlock!:FrameElementBlock
    private frameLine!:FrameElementLine
    public loader!:LoaderManagment
    public buttonManaged!:ButtonManaged

    constructor(config: {
        global:globalConfiguration, 
        urlWindow?:buttonURL,
        window?:window, 
        id?:string,
        reload?:() => void
    }){
        
        config.id ??= 'rucula-js';
        this.config = config

        ruculaGlobal.initGlobalConfiguration(config.global)
    }

    async init(){

        if(this.config.urlWindow){    
            
            let url = this.url(this.config.urlWindow).getURL()
            var windowApi = new WindowAPI(url)
            this.window = await windowApi.get(this.P)
        }
        else{
            this.window = this.config.window
        }
       
        this.globalWindow = document.getElementById(this.config.id!)!
        
        this.popup = new Popup(this.P)
        this.menuContext = new MenuContext(this.P)
        this.fieldMenuContext= new FieldMenuContext(this.popup, this.menuContext, this.P)
        this.layoutFrame = new LayoutFrame(this.P)
        this.tableDependency = new TableDependency();
        this.fragment = new Fragment(this.tableDependency);
        this.paginationEvents = new PaginationEvents(this.P, this.globalWindow)
        
        
        this.buttonsBase = new ButtonsBase(this.P)
        this.loader = new LoaderManagment(this.P)
        this.button = new Button(() => {
            let rucula = new Rucula(this.config)
                rucula.init()
                this.config?.reload()
        }, this.popup,this.P)
        
        
        defaultValues.setDefault(this.window)
        
        
        this.windowBaseDOM = new WindowBaseDOM(this.P, {
            globalWindow:this.globalWindow,
            openLeftGrid: this.window?.grid ?? false,
            windowName: this.window?.name 
        })
        
        if(this.window == null){
            
            let message = 'Não foi possível carregar janela informada. Considere entrar em contato com o administrador'
            this.popup.error( {
                text:message
            })
            throw new Error(message);
        }
        
        this.managmentObject = new ManagmentObject(this.fragment, this.tableDependency,this.window.frames);
        this.event = new EventManagment(this.P, this.managmentObject,this.globalWindow);
        this.field = new Field(this.managmentObject, this.globalWindow)
        this.eventButton = new EventButton(this.field, this.managmentObject,this.P)
        this.frameEvent = new FrameEvent(this.managmentObject)
        this.frameBlock = new FrameElementBlock(this.managmentObject,this.field, this.frameEvent, this.button, this.fieldMenuContext);
        this.frameLine = new FrameElementLine(this.managmentObject,this.field,this.frameEvent, this.button, this.fieldMenuContext, this.P);
    }
    
    create(){
        
        this.cleanRucula();
        
        let eventInit = new Event('rucula.init')
        let eventLoad = new Event('rucula.load')
        
        this.globalWindow.dispatchEvent(eventInit)
        configWindow.set(this.window, this.P)
        this.menuContext.init()
        this.fieldMenuContext.init()
        this.addHomeWindow();

        this.elementFormRucula = this.windowBaseDOM.getPrincipalElementRucula() as HTMLFormElement

        let buttons =  this.globalWindow.querySelectorAll(`#${this.P}action-crud button.managed`) as NodeListOf<HTMLButtonElement>

        this.buttonManaged = new  ButtonManaged(this.P,buttons)

        let form = this.globalWindow.querySelector('form.r-window-work')
        
        form?.addEventListener('change',() => {
                this.buttonManaged.initTosave()
            }
        )

        this.paginationEvents.headerSearch(this.window.gridSearch);
        this.paginationEvents.fotter(this.window.gridFooter)
        this.layoutFrame.configureLayout(this.window,this.elementFormRucula)
        this.createButtons()
        this.createFrames()
        this.buttonsBase.initButtonsTypeCrudDefault()
        this.buttonsBase.initButtonPlus()
        this.buttonsBase.crud(this.window?.crud)      
        this.globalWindow.dispatchEvent(eventLoad);
        
        (window as any).rucula = new RuculaLogs(this.managmentObject)


        this.tableDependency.snapshot()
        this.fragment.snapshot()
        
        this.event.on('erase-window',() => {
            this.buttonManaged.disableAll()
            this.revertToinit()
        })
    }

    private addHomeWindow(){
     
        if(this.window?.iconHome){
            
            let icon = document.getElementById(`${this.P}r-f-home-icon`)!
            icon?.classList.add(this.window.iconHome)
        }

        if(this.window?.messageHome){
        
            let title = document.getElementById(`${this.P}r-f-home-title`)!
            title.textContent = this.window?.messageHome
        }
        
        let titles = document.querySelectorAll(`.${this.P}${constIdBaseWindow.TITLE}`)
        titles?.forEach(title => {
            title.textContent = this.window.name
        })
    }
    
    reload(callback:any){
        callback()
    }

    private cleanRucula(){
        for (let index = 0; index < this.globalWindow.childNodes.length; index++) {            
            this.globalWindow.childNodes[index].remove();
        }
    }

    private createButtons(type:string="CRUD"){

        if(type == "CRUD"){
            this.button.prepareButtonsInLeftBox(this.window.button)
        }
        this.eventButton.eventButton(this.globalWindow, this.window.pathController, this.window.button)
        this.eventButton.openCloseRightListButtons()
    }

    private createFrames(){
        
        this.window.frames?.forEach(frame => {
            
            if(frame.type == constTypeFrame.BLOCK){

                const block = this.frameBlock.create(frame)
                this.elementFormRucula.appendChild(block)
                eventCreated(this.P, block,this.globalWindow) 
            }
            
            if(frame.type == constTypeFrame.LINE){
                            
                const line = this.frameLine.create(frame)
                this.elementFormRucula.appendChild(line)
                eventCreated(this.P,line,this.globalWindow)
            }  

            function eventCreated(p:string, frameElement:HTMLDivElement, elementRoot: HTMLElement){
                

                var eventName = `${p}frame.${frame.alias}.complete`
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

    public url (URL:buttonURL) {
        return new URLRucula(this.managmentObject, URL);
    } 
    
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

    p(text:string): string {
        let newText = prefixe(this.P,text);
        return newText
    }

    revertToinit(){
        this.tableDependency.revertToInit()
        this.fragment.revertToInit()
        this.frameBlock.revertToInit();
        this.frameLine.revertToInit();
    }
}
