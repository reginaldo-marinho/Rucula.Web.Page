export class ButtonManaged {
    
    private P:string
    private buttonsManeged!:NodeListOf<HTMLButtonElement>
    
    private atualModel = 'init'
    
    private modes = {
        init:'init',
        delete:'delete',
        save:'save'
    } 
    constructor(P:string,buttonsManeged:NodeListOf<HTMLButtonElement>) {
        this.P = P
        this.buttonsManeged = buttonsManeged
    }

    initTosave(){
        if(this.atualModel != this.modes.init) {
            return
        }

        let options = [`${this.P}r-a-save`]
        this.set(options)
        this.atualModel = this.modes.save
    }

    saveToAlter(){
        
        let options = [`${this.P}r-a-alter`, `${this.P}r-a-delete`]
        this.set(options)
    }
    
    deleteToInit(){
        let options = ['']
        this.set(options)
        this.atualModel = this.modes.init
    }    

    disableAll(){
        let options = ['']
        this.set(options)
    }
    
    private set(options:string[]){
        
        this.buttonsManeged.forEach(b => {

            let index = options.indexOf(b.id)
            if(index != -1 ){
                b.classList.remove('r-a-b-disable')
            }
            else{
                b.classList.add('r-a-b-disable')
            }
        })
    }
}
    
        
    