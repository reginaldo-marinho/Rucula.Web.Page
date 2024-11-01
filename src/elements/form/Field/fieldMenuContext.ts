import { contextMenu } from "../../../const"
import { field } from "../../../entities/form/field"
import { menuContext } from "../../../menu-context/menu-context"
import { Popup } from "../../../popup/popup"

export class FieldMenuContext {

    
    constructor(popup:Popup, P:string) {
        this.popup = popup
        this.P = P
    }
    private P:string
    private  popup:Popup
    private  fieldsInfo: { identity: string, field: field }[] = []
    private lastDetail!:HTMLElement

    init() {

        let menuOInput = document.getElementById(`${this.P}${contextMenu.INPUT}` )
        
        menuOInput?.addEventListener('click', () => {
            
            if(this.lastDetail){
                this.lastDetail.remove()
            }
            let ol = document.createElement('ol')

            this.lastDetail = ol

            let identity = menuContext.elemetInFocu().getAttribute('identity') as string

            let field = this.infoGet(identity)?.field

            let details = `  
            <table>
                <tr>
                    <td>Descrição</td>
                    <td>${field?.description ?? ''}</td>
                </tr>
                <tr>
                    <td>Propriedade</td>
                    <td>${field?.propertDto}</td>
                </tr>
                <tr>
                    <td>Obrigatório</td>
                    <td><input type="checkbox" ${(field?.requerid ?? false) == true ? 'checked' : ''} disabled/></td>
                </tr>
                <tr>
                    <td>Desabilitado</td>
                    <td><input type="checkbox" ${(field?.disable ?? false) == true ? 'checked' : ''} disabled/></td>
                </tr>
                <tr>
                    <td>Máximo</td>
                    <td>${field?.max ?? 0}</td>
                </tr>
                <tr>
                    <td>Minimo</td>
                    <td>${field?.min ?? 0}</td>
                </tr>
                <tr>
                    <td>Comprimento</td>
                    <td>${field?.maxLength ?? 0}</td>
                </tr>
                <tr>
                    <td>Informação</td>
                    <td>${field?.information ?? ''}</td>
                </tr>
            </table>
        `             
            ol.innerHTML = details

            this.popup.info({
                text:'Detalhamento',
                htmlBody: ol
            })
        })
    }
        
    infoSet (fieldInfo: { identity: string, field: field }) {
            this.fieldsInfo.push(fieldInfo)
    }

    infoGet (identity: string) {
        return this.fieldsInfo.find(c => c.identity == identity)
    }
}
