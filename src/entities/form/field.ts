import { button } from "./button"

export interface field {

    description: string
    identity:string
    type: string|string[2]
    textarea?:textarea
    maxLength?: number
    max?: number
    min?: number
    requerid: boolean
    disable: boolean
    propertDto: string
    information?:string
    width:number
    groupFormat?:string
    checkbox?:checkbox
    combo?:[],
    radio?:string[]
    value?: string
    button?:button
    mask?:string
    regex?:string
}

interface checkbox {
    on:string,
    off:string,
}
interface textarea {
    rows:number
    cols:number
}
