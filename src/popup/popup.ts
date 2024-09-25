import { constYesNo } from "../const"
import { callbackYesNo } from "./callback"

type config = {
    close?:boolean
    icon?:string
    title?:string
    text?:string
    footer?:string
    disableadFooter?:boolean
    disableadHeader?:boolean
    htmlBody?:HTMLElement
    timeout?:number

}

type configCommon = {
    text?:string,
    htmlBody?:HTMLElement
    timeout?:number
    disableadFooter?:boolean
    disableadHeader?:boolean
}

export class Popup {

    boxShow!:HTMLElement;

    boxShowAppendChield(element:HTMLElement){
        this.boxShow = document.querySelector('.r-box-show') as HTMLElement
        this.boxShow.appendChild(element)
        this.boxShow.classList.add('r-box-show-center')
    }

    messageElement(config:config){
                
        let message = document.createElement('div')
        message.classList.add('r-message')

        message.innerHTML = `
            <div class="r-message-header">
                <div class="r-message-header-icon">
                    <i class="bi ${config.icon}"></i>
                </div>   
                <div class="r-message-header-title">
                    ${config.title}
                </div>
            </div>
            
            <div class="r-message-content">
                <div class="r-message-content-text">
                    ${config.text}
                </div>
            </div>
            <div class="r-message-footer">
                ${config.footer}
            </div>`
        
        if(config?.disableadHeader){
            let header = message.querySelector('.r-message-header')
            header?.remove()
        }

        if(config?.disableadFooter){
            let footer = message.querySelector('.r-message-footer')
            footer?.remove()
        }
        
        if(config?.htmlBody){
            let messageContent = message.querySelector('.r-message-content')
            messageContent?.appendChild(config?.htmlBody)
        }

        return message
    }
    
    closeTimeout(div:HTMLElement,timeout:number,callback?:callbackYesNo){

        setTimeout(() => {
            
            div.remove()
            this.close()
            if(callback){
                callback()
            }
        }, 
        timeout)   
    }

    closeOKOrCancel(callback:any, div:HTMLElement){
        
        
        let ok = div.querySelector('button.ok')
        let cancel = div.querySelector('button.cancel')

        ok?.addEventListener('click',()=> {
            
            div.remove()
            this.close()

            if(callback){
                callback(constYesNo.YES)
            }
            
        })

        cancel?.addEventListener('click',()=> {
            
            div.remove()
            this.close()

            if(callback){
                callback(constYesNo.NO)
            }

        })
    }

    close(){
        this.boxShow.classList.remove('r-box-show-center')
    }

    info(config: configCommon, callback?:callbackYesNo){

        let info = this.messageElement({
            icon:"bi-info-circle color-darkgrey",
            title:"Informação",
            text:config.text,
            footer: 
            `<div class="r-message-footer">
                <div class="cancel-ok">
                    <button class="ok">OK</button>        
                </div>
            </div>`,
            disableadFooter: config.disableadFooter,
            disableadHeader: config.disableadHeader,
            htmlBody:config.htmlBody
        });
                
        if(config?.timeout){
            this.closeTimeout(info,config.timeout,callback)
        }

        this.closeOKOrCancel(callback, info)

        this.boxShowAppendChield(info)
    }

    sucess (config: configCommon, callback?:callbackYesNo){

        let sucess = this.messageElement({
            icon:"bi-check2-circle color-green",
            title:"Sucesso",
            text:config.text,
            footer: 
            `<div class="r-message-footer">
                <div class="cancel-ok">
                    <button class="ok">OK</button>        
                </div>
            </div>`,
            disableadFooter: config.disableadFooter
        });
        
        this.closeOKOrCancel(callback, sucess)

        if(config.timeout){
            this.closeTimeout(sucess,config.timeout)
        }

        this.boxShowAppendChield(sucess)
    }

    warning (config: configCommon, callback?:callbackYesNo){

        let warning = this.messageElement({
            icon:"bi-exclamation-triangle color-orange",
            title:"Atenção",
            text:config.text,
            footer: 
            `<div class="r-message-footer">
                <div class="cancel-ok">
                    <button class="ok">OK</button>
                    <button class="cancel">Cancel</button>
                </div>    
            </div>`,
            disableadFooter: config.disableadFooter
        });
        
        this.closeOKOrCancel(callback, warning)

        if(config.timeout){
            this.closeTimeout(warning,config.timeout)
        }

        this.boxShowAppendChield(warning)
    }
    
    error  (config: configCommon, callback?:callbackYesNo){

        let warning = this.messageElement({
            icon:"bi-x-circle color-red",
            title:"Erro",
            text:config.text,
            footer: 
            `<div class="r-message-footer">
                <div class="cancel-ok">
                    <button class="ok">OK</button>        
                </div>    
            </div>`,
            disableadFooter: config.disableadFooter
        });
        
        this.closeOKOrCancel(callback, warning)

        if(config.timeout){
            this.closeTimeout(warning,config.timeout)
        }

        this.boxShowAppendChield(warning)
    }
}