import { constPagination } from "../const";
import { WindowBaseDOM } from "../elements/window-base/WindowBase";

export class PaginationEvents  {

    
    windowBaseDOM:WindowBaseDOM
    constructor(windowBaseDOM:WindowBaseDOM) {
        this.windowBaseDOM = windowBaseDOM
    }
    
    headerSearch (gridSearch:boolean){

            let search = document.getElementById(constPagination.FIND)
            
            if(gridSearch == false){
                search?.remove();
            }

            let elementRoot = this.windowBaseDOM.getElementRoot() 

            let body = {
                detail: {
                  value: ''
                }
            }

            let event = new CustomEvent('r-pagination-find', body)
            
            search?.addEventListener('submit',(e) => {
                
                e.preventDefault();
                
                var formData = new FormData(e.target as HTMLFormElement)
                
                body.detail.value = String(formData.get('r-find-value'))

                elementRoot.dispatchEvent(event)

            })
        }
    fotter (gridFooter:boolean){
            
            if(gridFooter == false){
                document.getElementById('r-act-grid-footer')?.remove()
            }

            let elementRoot = this.windowBaseDOM.getElementRoot() 

            let pagination = {
                detail: {
                  page: ''
                }
            };
    
            let event = new CustomEvent('r-pagination', pagination)
            
            document.getElementById(constPagination.FIRST)?.addEventListener('click',() => dispatchEvent('first'))
            document.getElementById(constPagination.LAST)?.addEventListener('click',() => dispatchEvent('last'))
            document.getElementById(constPagination.PREVIOUS)?.addEventListener('click',() => dispatchEvent('previous'))
            document.getElementById(constPagination.NEXT)?.addEventListener('click',() => dispatchEvent('next'))
            
            
            function dispatchEvent(page:string){
                
                pagination.detail.page = page 
                elementRoot.dispatchEvent(event);
            }      
            
            let row = {
                detail: {
                  row: 0
                }
            }
    
            let eventRow = new CustomEvent('r-pagination-row', row)
    
            document.getElementById(constPagination.ROW_NUMBER)?.addEventListener('change',(e) => {
                var select = e.target as HTMLSelectElement
                row.detail.row = Number( select.value)
                elementRoot.dispatchEvent(eventRow)
            });
        }
    }