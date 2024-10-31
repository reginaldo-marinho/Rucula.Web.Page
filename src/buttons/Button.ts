import { button } from '../entities/form/button';
import { ElementStrategy } from './ElementEstrategy';
import { ElementButton } from './ElementButton';
import { ElementLink } from './ElementLink';
import { constIdBaseWindow, constTargetButtonCrudDefault } from '../const';
import { ruculaGlobal } from '../global/GlobalConfig';
import { enviroment } from '../global/entities/Enviroments';
import { cookie } from '../common/coockie/coockie';
import { Popup } from '../popup/popup';
import { callbackYesNo } from "../popup/callback"

export class  Button  {
    
    
    private callbackReaload:() => void
    
    popup:Popup

    constructor(callbackReaload:() => void,popup:Popup) {
        this.callbackReaload = callbackReaload
        this.popup = popup
    }
    elementStrategy!:ElementStrategy;
    
    buttonIsNotDefault(target:string){
        
        return  target != constTargetButtonCrudDefault.SAVE && 
        target != constTargetButtonCrudDefault.ALTER && 
        target != constTargetButtonCrudDefault.DELETE
    }

    createButtonOrLink (button:button):HTMLButtonElement|HTMLAnchorElement{
        if(button.type != "button" && button.type != "link"){
            throw new Error("tipo do botão deve ser button ou link");
        }
        if(button.type == "button"){
            this.elementStrategy = new  ElementButton();
        }
        if(button.type == "link"){
            this.elementStrategy = new ElementLink();
        }
        return this.elementStrategy.createElement(button);
    } 

    getButton(target:string) {
        return document.getElementById(target)
    }

    prepareLocalizations(){
     

        let globalization = document.getElementById(constIdBaseWindow.GLOBALIZATION)
        let olliGlobalization = document.getElementById(constIdBaseWindow.OLLI_GLOBALIZATION)

        globalization?.addEventListener("click", () => {
            olliGlobalization?.classList.toggle("r-display-none")
        })
        
        let globalConf = ruculaGlobal.getConfigurationGlobal()

        globalConf.localizations.forEach(loc => {
            
            const li = document.createElement("li")
            
            li.textContent = loc.language;
            
            olliGlobalization?.appendChild(li)
            
            li.addEventListener("click",() => {
                ruculaGlobal.setLocalization(loc.locales)
            })
        })
    }

    prepareEnviroments(){
     
        let baseEnvironments = document.getElementById(constIdBaseWindow.ENVIROMENT)!
        let olliEnviroment = document.getElementById(constIdBaseWindow.OLLI_ENVIROMENT)
        let description = baseEnvironments.querySelector('.description')!
        let icon = baseEnvironments.querySelector('i')!
        
        let env = cookie.read('enviroment')
        
        if(env != "null" && env != null){
            ruculaGlobal.setEnviroment(env)
        }

        let atualEnvironment = ruculaGlobal.getEnvironment();
        
        setDescription(atualEnvironment)

        baseEnvironments?.addEventListener("click", (e) => {
            olliEnviroment?.classList.toggle("r-display-none")
        })
        
        let globalConf = ruculaGlobal.getConfigurationGlobal()

        globalConf.environments.forEach(enviroment => {
            
            const li = document.createElement("li")
            
            li.setAttribute('env',enviroment.env)
            li.textContent = enviroment.description
            
            olliEnviroment?.appendChild(li)
            
            li.addEventListener("click",(e) => {

                let reload = (yesNo:boolean) => {
                    if(yesNo){

                        ruculaGlobal.setEnviroment(enviroment.env)
                        setDescription(enviroment)
                        
                        let target = e.target as HTMLElement
                        let env = target.getAttribute('env')
                        
                        document.cookie = `enviroment=${env}`
                        this.callbackReaload();
                    }
                }
                
                this.popup.warning({
                    text:'A alteração desejada reiniciará a interface. Deseja continuar?'
                },reload as callbackYesNo)

                
            })
        })

        function setDescription(enviroment:enviroment){
            
            description.textContent = enviroment.description
            if(enviroment.env.toLocaleLowerCase() == 'production'){
                icon.style.color = 'red'
            }
            if(enviroment.env != 'production'){
                icon.style.color = ''
            }
        }
    }
        
    prepareButtonsInLeftBox (button:button[]) {
            
        const ListRightButtons = document.getElementById("r-a-menu-vertical-list")
        
        let buttons = button?.filter(c=> this.buttonIsNotDefault(c.target))
        
        if(buttons?.length == 0 || buttons == undefined){
            document.querySelector('.r-vertical-actions')?.classList.add('r-display-none')
        }
        
        buttons?.forEach(b => {
                
            const li = document.createElement("li")
            li.appendChild(this.createButtonOrLink(b))

            ListRightButtons?.appendChild(li)  
        })
        
        this.prepareLocalizations()
        this.prepareEnviroments()

    }
        
    disable(target:string) {
            
        let button = this.getButton(target)
        button?.classList.remove('r-display-none')
        button?.setAttribute('disabled','')
    }
    enable(target:string) {

        let button = this.getButton(target)
        button?.classList.remove('r-display-none')
        button?.removeAttribute('disabled')
    }
    hide(target:string) {

        let button = this.getButton(target)
        button?.classList.add('r-display-none')
    }
    destroy (target:string) {

        let button = this.getButton(target)
        button?.remove()
    }
}

