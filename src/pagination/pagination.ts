import { constPagination } from "../const";

export class PaginationEvents  {

    
    private globalWindow:HTMLElement
    private p:string
    constructor(p:string, globalWindow:HTMLElement) {
        this.p = p 
        this.globalWindow = globalWindow
    }
    
    headerSearch (gridSearch:boolean){

            let search = document.getElementById(`${this.p}${constPagination.FIND}`)
            
            if(gridSearch == false){
                search?.remove();
            }

            let body = {
                detail: {
                  value: ''
                }
            }

            let event = new CustomEvent(`${this.p}r-pagination-find`, body)
            
            search?.addEventListener('submit',(e) => {
                
                e.preventDefault();
                
                var formData = new FormData(e.target as HTMLFormElement)
                
                body.detail.value = String(formData.get('r-find-value'))

                this.globalWindow.dispatchEvent(event)

            })
        }
    fotter (gridFooter:boolean){
            
            if(gridFooter == false){
                document.getElementById('r-act-grid-footer')?.remove()
            }

            let pagination = {
                detail: {
                  page: ''
                }
            };
    
            let event = new CustomEvent(`${this.p}r-pagination`, pagination)
            
            document.getElementById(`${this.p}${constPagination.FIRST}`)?.addEventListener('click',() => dispatchEvent('first',this.globalWindow))
            document.getElementById(`${this.p}${constPagination.LAST}`)?.addEventListener('click',() => dispatchEvent('last',this.globalWindow))
            document.getElementById(`${this.p}${constPagination.PREVIOUS}`)?.addEventListener('click',() => dispatchEvent('previous',this.globalWindow))
            document.getElementById(`${this.p}${constPagination.NEXT}`)?.addEventListener('click',() => dispatchEvent('next',this.globalWindow))
            
            function dispatchEvent(page:string,globalWindow:HTMLElement){
                
                pagination.detail.page = page 
                globalWindow.dispatchEvent(event);
            }      
            
            let row = {
                detail: {
                  row: 0
                }
            }

            let eventRow = new CustomEvent(`${this.p}r-pagination-row`, row)

            document.getElementById(`${this.p}${constPagination.ROW_NUMBER}`)?.addEventListener('change',(e) => {
                var select = e.target as HTMLSelectElement
                row.detail.row = Number( select.value)
                this.globalWindow.dispatchEvent(eventRow)
            });
        }
    }