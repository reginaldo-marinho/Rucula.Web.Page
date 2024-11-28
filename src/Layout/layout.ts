import { window } from "../entities/form/window";

export class LayoutFrame {

    P:string
    constructor(P:string) {
        this.P = P
    }
    configureLayout(window:window,principalElementRucula:HTMLElement){
    
        if(window.layout.items === undefined){
            return
        }
    
        let rowLength = window.layout.items.length
        let colLength = window.layout.items[0].length
    
        window.layout.tamplateColumns = colLength
        window.layout.tamplateRow = rowLength

        var tamplateColumns = window.layout.tamplateColumns
        var tamplateRows = window.layout.tamplateRow

        principalElementRucula.style.gridTemplateColumns = `repeat(${tamplateColumns},1fr)` 
        principalElementRucula.style.gridTemplateRows = `repeat(${tamplateRows},1fr )`

        for (let row = 1; row <= rowLength; row++) {
    
            for (let col = 1; col <= colLength; col++) {            

                let item = window.frames.find(c => c.alias == window.layout.items[row-1][col-1])!
    
                if(item == undefined){
                    continue
                }
            
                if(item.layout === undefined){
                    item.layout = {row:{start:-1, end:-1},col:{start:-1, end:-1}}
                }
    
                if(item.layout.row.start === -1){
                    item.layout.row.start = row
                }
                
                if(item.layout.col.start === -1){
                    item.layout.col.start = col
                }
    
                item.layout.row.end = row + 1
                item.layout.col.end = col + 1
            }  
        }
    }

}
