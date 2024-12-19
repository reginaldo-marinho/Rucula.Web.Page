type fragmentObject = {

    key : {
        identity:string, //? Unique ID created for internal control
        alias:string //? Unique ID created for user external control
    },
    config:{
        objectDto: string, //? Name of the object that represents the frame
        identity: string, //? Unique ID created for internal control
        object: any //?Object that is created dynamically and will be used later
        objectSnapshot?: any
        getValueInObjectFragment: any 
    }
}

type fragmentField = {

    key : {
        identity:string //? Unique ID created for internal control
    },
    config:{
        fragmentObjectIdentity: string, //? Reference to the parent fragment of the object type
        alias:string, //! Reference to the Alias of the parent object. This field must be exactly the same value contained in the `fragmentObjectIdentity` reference object
        identity: string //? Unique ID created for internal control
        propertDto:string //? Name of the propert that represents the frame
        line: number|undefined,
        dependency:string,
        dependencySnapshot?:string,
    }    
}

type entityConfiguration = {
    aliasOrIDentity:string,
    propertDto:string,
    line?:number|undefined,
}

export {
    fragmentObject,
    fragmentField,
    entityConfiguration
}