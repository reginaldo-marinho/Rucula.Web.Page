export class LoaderManagment {

    loaderBkp:HTMLDivElement = document.createElement('div')
    loaderElement = document.createElement('div');
    boxShow!:HTMLDivElement
    P:string

    constructor(P:string) {
        this.P = P
        this.loaderElement.classList.add('r-loader')
        this.loaderElement.classList.add(`${this.P}js-r-loader`)
        this.loaderElement.classList.add('r-item-center')
    }
    enable (){
        this.boxShow = document.getElementById(`${this.P}r-box-show`) as HTMLDivElement
        this.boxShow?.classList.add('r-box-show-center')
        this.boxShow?.appendChild(this.loaderElement)
        
    }
    disable (){            
        let loader = document.querySelector(`.${this.P}js-r-loader`) as HTMLDivElement
        this.loaderBkp.appendChild(loader)
        this.boxShow?.classList.remove('r-box-show-center')
    
    }
}
