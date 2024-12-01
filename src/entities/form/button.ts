export interface button{
    link?:string
    icon?:string
    text?:string
    type:string
    color?:string
    target:"r-a-save"|"r-a-alter"|"r-a-delete"|string
    URL?:buttonURL
    body?:string,
    fullWidth?:boolean,
    class?:string
}

export type buttonURL = {
    absolute:string 
    relative:string 
    params:string
}