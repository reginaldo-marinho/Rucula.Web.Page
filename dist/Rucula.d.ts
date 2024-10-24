import { window } from "./entities/form/window";
import { globalConfiguration } from "./global/entities/GlobalConfiguration";
import { Popup } from "./popup/popup";
import { EventManagment } from "./Event/event";
import { URLRucula } from "./URL/urlManagment";
import { ManagmentObject } from "./object/ObjectManagment";
import { TableDependency } from "./table-dependency/TableDependency";
export declare class Rucula {
    private window;
    private elementRucula;
    private elementFormRucula;
    popup: Popup;
    event: EventManagment;
    managmentObject: ManagmentObject;
    tableDependency: TableDependency;
    private button;
    private layoutFrame;
    private fragment;
    private field;
    private eventButton;
    private frameEvent;
    private config;
    constructor(config: {
        global: globalConfiguration;
        window: window;
        id: string | undefined;
        reload?: () => void;
    });
    create(): void;
    private addHomeWindow;
    reload(callback: any): void;
    private cleanRucula;
    private createButtons;
    private createFrames;
    loader: {
        enable: () => void;
        disable: () => void;
    };
    url: (URL?: {
        absolute: string;
        relative: string;
        params: string;
    }) => URLRucula;
    objectUnique(alias: string): any;
    getFullObject(): any;
    getSepareteObject(): any;
    setValue(targetPath: string, value: any): void;
    getValue(config: string): any;
}
