import global from "./exemples/config.global.json";
import os from './exemples/ordemServicoApiControl.json'
import { Rucula } from "./src/Rucula"

import "./public/style.css"
import "./public/normalize.css"
import { callbackYesNo } from "./src/popup/callback";

(()=> {
    
    let rucula = new Rucula({
        global:global as any,
        window: os as any,
        id:'js'
    });
    
    rucula.event.on('input.itensServico.quantidade',(e:CustomEvent) => {

        let _this = rucula.event.field.getDetails(e)

        let path_valorUnitario = _this.targetPathWithRow('itensServico.valorUnitario')
        let path_subTotal = _this.targetPathWithRow('itensServico.subtotal')
        
        let value_valorUnitario = rucula.object.getValue(path_valorUnitario)

        let value_subTotal = parseFloat(value_valorUnitario) * Number(_this.value)

        rucula.object.setValue(path_subTotal,value_subTotal)
    })

    rucula.event.on('input.itensServico.quantidade',(e:CustomEvent) => {
      
        let identity = e.detail.identity
        
        let element = identity.element as HTMLInputElement

        let value = Number(element.value)
        
        if(value > 10){
            element.style.color = "blue"  
            element.style.fontWeight = "bold"

        }
        
        if(value < 0){
            element.style.color = "red"  
            element.style.fontWeight = "bold";
        }
        if(value < 10 && value >= 0){
            element.style.color = ""  
            element.style.fontWeight = ""
        }
    })

    rucula.event.on('r-a-save',(e:CustomEvent) => {

        rucula.popup.info({
            text:"Registrando...", 
            timeout:500, 
            disableadFooter:true
        },
        () => rucula.popup.sucess({
                text:"Informações Registradas", 
                timeout:1000, 
                disableadFooter:true
            })

        );
    })

    rucula.event.on('r-a-alter',(e:CustomEvent) => {
        rucula.popup.sucess({text:"Informações Alteradas"})
    })
        
    rucula.event.on('r-a-delete',(e:CustomEvent) => {
        rucula.popup.warning({text:"O registro será excluido permanentemente, deseja continuar?"},resultOption as callbackYesNo)
    })
  
    function resultOption(yesNo:boolean):void{
        
        if(yesNo){
            rucula.popup.info({
                    text:"excluindo...", 
                    timeout:500, 
                    disableadFooter:true,
                    disableadHeader:true
                },sucess);
            return
        }
    }

    function sucess(){
        rucula.popup.sucess({text:"Item Excluido",timeout:2000})   
    }

    rucula.event.on('r-pagination',(e:any) => console.log(e.detail.page))
    rucula.event.on('r-pagination-row',(e:any) => console.log(e.detail.row))
    rucula.event.on('r-pagination-find',(e:any) => console.log(e.detail.value))    

    rucula.event.on('frame.cliente.complete',(e:any) => {
    })
    

    rucula.create();
})()