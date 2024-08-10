import { cookie } from "../../common/coockie/coockie";
import { constIdBaseWindow, constPagination } from "../../const";
import { menuContext } from "../../menu-context/menu-context";
import { fieldMenuContext } from "../form/Field/fieldMenuContext";

export let windowBaseDOM = (() => {

    let elementRoot:HTMLElement
    function createWindowBase(id:string){

        const ruculaWindow = document.createElement("div");
        ruculaWindow.classList.add("r-w");
    
        const actions = document.createElement("div");
        actions.className = "r-left-block"
        actions.innerHTML = componentActions();    
        ruculaWindow.appendChild(actions)
    
        const contentForm = document.createElement("div");

        contentForm.innerHTML = createComponentCreateOrEdit()
        
        ruculaWindow.appendChild(contentForm.childNodes[0] as HTMLDivElement)
        ruculaWindow.appendChild(contentForm.childNodes[1] as HTMLDivElement)
            
        const div = document.getElementById(id)
        div?.appendChild(ruculaWindow);
        calculateHeightRuculaWindow()
        prepareEventsButtonsCrud()
        maximizeWindow()
        eraseWindow()
        alterTheme()
        openActionswindow()
        menuContext.init()
        fieldMenuContext.init()
        
        function calculateHeightRuculaWindow(){
            
            let offsetTop = Number(ruculaWindow.offsetTop)
            let height = Number(window.innerHeight)
            ruculaWindow.style.height = `${height-offsetTop}px` 
        }

    }
    
    function createNameWindow(name:string){
        let window = document.querySelector(".r-w-t") as HTMLElement
        window.innerHTML = name
    }

    function componentActions(){

        const ACTIONS = 
            `<div class="r-act" id="actions">
                <div class="r-act-opt r-head" id="w-title">
                    <button id="${constIdBaseWindow.NEW}" class="r-a-b r-btn-new-cancel-close"><i class="bi bi-plus-lg"></i></button>
                    <div class="r-w-t">
                    </div>
                    <button id="r-a-many" class="r-a-b"><i class="bi bi-list"></i></button>
                </div>
                <div class="r-left-block-grid" id="w-grid">
                    <form class="searh-items-grid" id="${constPagination.FIND}" autocomplete=off>
                        <input name="r-find-value" type="text"/>
                        <button><i class="bi bi-search"></i></button>
                    </form>
                    <div class="r-act-grid-body">
                    </div>
                    <div class="r-act-grid-footer" id="r-act-grid-footer">
                        <div>
                            <span>N. Linha</span>
                            <select id="${constPagination.ROW_NUMBER}" name="len-page">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="1000">1000</option>
                            </select>
                        </div>
                         <div>
                            <button id="${constPagination.FIRST}" class="r-a-b"><i class="bi bi-arrow-up"></i></button>
                            <button id="${constPagination.LAST}" class="r-a-b"><i class="bi bi-arrow-down"></i></button>
                            <button id="${constPagination.PREVIOUS}" class="r-a-b"><i class="bi bi-arrow-left"></i></button>
                            <button id="${constPagination.NEXT}" class="r-a-b"><i class="bi bi-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
             </div>` 
    
        return ACTIONS;
    }
    
    function createComponentCreateOrEdit(){
    
        const CREATE_OR_EDIT =  
        `<div class="container-r-f  js-open-close-container">
            <div class="r-act-opt r-head" id="w-title">
            </div>
            <div class="r-f-items r-f-home">
                <div class="r-f-home-round">
                    <i id="r-f-home-icon"class="bi" ></i>
                </div>
                <h3 id="r-f-home-title"></h3>
            </div>
        </div>
        <div autocomplete="off" class="r-f container-r-f r-display-none js-open-close-container">
           
        <div class="r-facede-action top">
            <div class="r-window-name r-facede-action top">
                <h3 class="${constIdBaseWindow.TITLE}"></h3>
            </div>
            <div class="r-head r-read-new r-facede-action top">
               
                <div style="z-index: 10; width: 100%;">
                    <button id="${constIdBaseWindow.ACTIONS_WINDOW}" class="r-a-b r-actions-window"><i class="bi bi-nut"></i></button>
                    <div class="r-display-inline-block r-actions-window r-actions-window-itens">
                        <div class="r-display-inline-block">
                            <button id="${constIdBaseWindow.MAXIMIZE_WINDOW}" class="r-a-b"><i class="bi bi-arrows"></i></button>
                            <button id="${constIdBaseWindow.RELOAD}" class="r-a-b "><i class="bi bi-arrow-repeat"></i></button>
                            <button id="${constIdBaseWindow.ERASE_WINDOW}" class="r-a-b "><i class="bi bi-eraser"></i></button>
                            <button id="${constIdBaseWindow.ALTER_THEME}" class="r-a-b "><i class="bi bi-circle-half"></i></button>
                        </div>
                        <div class="actions-view">
                            <button id="${constIdBaseWindow.GLOBALIZATION}" class="r-a-b">
                                <i class="bi bi-globe-americas"></i>
                                <ol id="${constIdBaseWindow.OLLI_GLOBALIZATION}" class="${constIdBaseWindow.OLLI_GLOBALIZATION} list-vertical-buttons list-vertical-buttons-pp-left r-display-none">
                                </ol>                        
                            </button> 
                            <button id="${constIdBaseWindow.ENVIROMENT}" class="r-a-b">
                                <div class="desc-environment"><i class="bi bi-fire"></i> <span class="description"></span> </div>
                                <ol id="${constIdBaseWindow.OLLI_ENVIROMENT}" class="${constIdBaseWindow.OLLI_ENVIROMENT} list-vertical-buttons list-vertical-buttons-pp-left r-display-none">
                                </ol>                        
                            </button>    
                        </div>
                    </div>
                </div>
                <div class="r-head r-read-edit">
                    <button id="r-a-save" class="r-a-b "><i class="bi bi-box-arrow-in-down"></i></button>
                    <button id="r-a-alter" class="r-a-b"><i class="bi bi-pen"></i></button>
                    <button id="r-a-delete" class="r-a-b"><i class="bi bi-trash"></i></button>    
                    <button id=${constIdBaseWindow.BUTTONS_MENU_VERTICAL} class="r-a-b"><i class="bi bi-arrows"></i></button>    
                </div>
                </div>
            </div>

            <div class="r-w-body">
                <form class="r-f-items" id="${constIdBaseWindow.FORM_RUCULA_JS}" autocomplete="off">
                </form>
                <div class="r-vertical-actions">
                    <ol id=${constIdBaseWindow.BUTTONS_MENU_VERTICAL_LIST} class=""> 
                    </ol>
                    <button id=${constIdBaseWindow.BUTTONS_MENU_VERTICAL_MOBILE} class="r-a-b actions-mobile"><i class="bi bi-arrows"></i></button>    
                </div>
            </div>
            <div class="r-facede-action bottom">
            </div>
            <div class="r-box-show" id="r-box-show"> 
            </div>
        </div>
        `
    
        return CREATE_OR_EDIT;
    }
    
    function prepareEventsButtonsCrud(){
    
        let rNew = document.getElementById(constIdBaseWindow.NEW)
            
        let framesOn = cookie.read("frames-on"); 
        if(framesOn != "false"){
            openClose()
        }
                
        rNew!.addEventListener("click", () => {
            
            let value = cookie.read("frames-on") == "true"
            document.cookie=`frames-on=${!value}`
            openClose()
            
        })
        
        function openClose(){
            openCloseContainer();
            rNew!.classList.toggle("r-btn-new-convert-close")
            rNew!.classList.toggle("r-btn-new-cancel-close")
        }
    }
    
    function openCloseContainer(){
        
        let itemContainer = document.querySelectorAll(".js-open-close-container")
        
        itemContainer.forEach(item => {
            item.classList.toggle("r-display-none")
        })
    }
    
    
    function closeLeftGrid(grid:boolean){
        
        if(grid == false){
            
            if(blockRuculaFrameNotfocus()){
                let buttonNew = document.getElementById(constIdBaseWindow.NEW);
                buttonNew?.click()
            }
            
            let actions = document.getElementById("actions");
            actions?.remove()

            let maximizeWindow = document.getElementById(constIdBaseWindow.MAXIMIZE_WINDOW)
            maximizeWindow?.remove()
            
            function blockRuculaFrameNotfocus(){
                let rf = document.querySelector('.r-f.r-display-none')
                return rf != null
            }
        }





    }

    function maximizeWindow(){

        let maximize = document.getElementById(constIdBaseWindow.MAXIMIZE_WINDOW);
        
        
        maximize?.addEventListener('click',() => {
            let actions = document.getElementById("actions");
            actions?.classList.toggle("r-close-grid");
        })
    }
    
    function eraseWindow(){
    
        let erase = document.getElementById(constIdBaseWindow.ERASE_WINDOW)
        let form = windowBaseDOM.getPrincipalElementRucula()
        
        erase?.addEventListener('click', () => {
            form.reset();
        })
    }
        
    function openActionswindow(){

        let actions = document.getElementById(constIdBaseWindow.ACTIONS_WINDOW)

        actions?.addEventListener('click', (e) => {
            actions?.nextElementSibling?.classList.toggle('r-actions-window-active')
            actions?.nextElementSibling?.classList.toggle('r-actions-window')
        })
    }

    function alterTheme(){

        let rw = document.querySelector('.r-w')

        let actions = document.getElementById(constIdBaseWindow.ALTER_THEME)

        let theme = cookie.read('theme')

        if(theme == 'dark'){
            rw?.classList.add('dark-theme')
        }

        actions?.addEventListener('click', (e) => {

            rw?.classList.toggle('dark-theme')

            if(rw?.classList.contains('dark-theme')){
                document.cookie = "theme=dark"
            }
            else{
                document.cookie = "theme=light"
            }
        })
    }

    return {
        createWindowBase: (id:string) => {
            createWindowBase(id)
        },
        createNameWindow: (name:string) => {
            createNameWindow(name)
        },
        setElementRoot:(id:string) => {
            elementRoot = document.getElementById(id)!
        },
        getElementRoot:() => {
           return elementRoot
        },
        getPrincipalElementRucula:() => {
            return document.getElementById(constIdBaseWindow.FORM_RUCULA_JS) as HTMLFormElement
        },
        closeLeftGrid: (grid:boolean) => closeLeftGrid(grid)
    }
})()