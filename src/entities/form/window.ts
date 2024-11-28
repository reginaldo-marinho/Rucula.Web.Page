import { button } from "./button";
import { frame } from "./frame";

export type cssGrid = {
    items:[[]],
    tamplateColumns:number
    tamplateRow:number
}

export interface window{
    name: string
    type: string
    crud: string
    messageHome: string
    iconHome: string
    pathController: string
    frames: Array<frame>
    grid: boolean
    gridFooter: boolean
    gridSearch: boolean
    paramsGrid: string
    button: button[]
    joinChield: string[]
    layout: cssGrid
}