export const DOT_SEPARATOR = ".";

export const eventRucula = {

    RESET_BACKGROUND:"reset-background",
    RESET_BACKGROUND_EVENT: new Event("reset-background"),

    BEFORE_SEND_OBJECT_HTTP:"before-send-object-http",
    EVENT_BEFORE_SEND_OBJECT_HTTP: new Event("before-send-object-http"),

    AFTER_SEND_OBJECT_HTTP:"after-send-object-http",
    EVENT_AFTER_SEND_OBJECT_HTTP: new Event("after-send-object-http"),

    SEND_OBJECT_HTTP_OK:"send-object-http-ok",
    EVENT_SEND_OBJECT_HTTP_OK: new Event("send-object-http-ok"),

    SEND_OBJECT_HTTP_ERROR:"send-object-http-error",
    EVENT_SEND_OBJECT_HTTP_ERROR: new Event("send-object-http-error")

}

export const constPrefixEventField = {
    BEFORE:'before',
    INPUT:'input',
    AFTER:'after',
}

export const constTypeInput = {
    
    TEXT: "text",   
    NUMBER: "number", 
    BOOLEAN: "bool", 
    DATE: "date",
    CURRENCY: "currency",
    SELECT: "select",
    CHECKBOX: "checkbox",
    TEXT_AREA: "textarea",
    RADIO: "radio",
    PASS: "password"
}

export const constGroupFormat = {

    DOWN : "down",
    LEFT : "left",
    RIGTH: "right"
}

export const constTypeFrame = {

    BLOCK: "block",
    LINE: "line"
}


export const constIdBaseWindow =  {

    NEW: "r-a-new",
    RELOAD:"r-a-reload",
    ERASE_WINDOW: "erase-window",
    MAXIMIZE_WINDOW: "maximize-window",
    GLOBALIZATION: "r-globalization",
    OLLI_GLOBALIZATION: "r-globalization-list",    
    ENVIROMENT: "r-enviroment",
    OLLI_ENVIROMENT: "r-enviroment-list",    
    FORM_RUCULA_JS:"form-rucula-js",
    BUTTONS_MENU_VERTICAL: "r-a-menu-vertical",
    BUTTONS_MENU_VERTICAL_LIST: "r-a-menu-vertical-list",
    TITLE:"r-window-title"
}


export const constAttrInput = {
    ATTR_TYPE: "ruc-type"
}


export const constTargetButtonCrudDefault = {

    SAVE:"r-a-save",
    ALTER: "r-a-alter",
    DELETE:"r-a-delete"
    
}

export const constInputClass = {
    FOCUS_IN_INPUT_WITH_DEPENDENCY: 'r-i-focus-dependency'
}

export const constFrameLineActions = {
    ADD: 'f-l-action-add',
    REMOVE:'f-l-action-remove'
}
