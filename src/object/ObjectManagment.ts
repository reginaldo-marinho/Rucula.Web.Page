import { convertValueType } from '../Helpers/Helper';
import { constFrameLineActions, constTypeFrame } from '../const';
import { frame } from '../entities/form/frame';
import { Fragment } from '../fragment/fragment';
import { TableDependency } from '../table-dependency/TableDependency';
import { entityConfiguration, fragmentField, fragmentObject } from './ObjectAliases';
import { generateUUID } from './ObjectHelper';

export class ManagmentObject {
             
    public fragment:Fragment
    public tableDependency:TableDependency

    constructor(fragment:Fragment,tableDependency:TableDependency,frames:frame[]) {                
        this.fragment = fragment
        this.tableDependency = tableDependency
        
        if(frames.length > 0){
            this.initObjects(frames)
            frames.forEach(frame => {
                if(frame.type === 'block'){
                    this.configFieldBlock(frame)
                }
                if(frame.type === 'line'){
                    this.addLine(frame)
                }    
            });
        }
        
    }

    pathObjectBase:{parent:string, alias:string, configFrame:string, }[] = [];
                    
    /**
     * @description Creates an array of fragments of type object
     * @param {frame[]} frames
     */
    private initObjects(frames:frame[]){
    
        this.pathObjectBase = []
        
        frames?.forEach(frame => {
            
            frame.identity = generateUUID('F')
            
            if(frame.alias === undefined){
                throw new Error('propert alias is Requerid');                
            }
            
            let fragmentObject:fragmentObject = {
                key: {
                    identity:frame.identity,
                    alias: frame.alias
                },
                config:{
                    objectDto: frame.objectDto,
                    identity: frame.identity,
                    object: frame.type == constTypeFrame.BLOCK ? {} : [],
                    getValueInObjectFragment: this.getValueInObjectFragment
                }
            }

            this.fragment.objects_add(fragmentObject)

            this.pathObjectBase.push({ parent: frame.parent, alias: frame.alias, configFrame:frame.identity })
                        
        });
    }
    
    /**
    * @description Creates an array of fragments of type Field for Frames of type 'block'
    * @param {frame} frame
    */
    private configFieldBlock(frame:frame){
        
        frame.fields?.forEach(field => {
            
            field.identity = generateUUID('I') //! This instruction should not be removed from its place, otherwise there will be problems due to missing identity not created
            
            let config:fragmentField = {
                key: {
                    identity:field.identity,
                },
                config: {
                    alias:frame.alias,
                    fragmentObjectIdentity: frame.identity,
                    identity: field.identity,
                    propertDto: field.propertDto,
                    line: undefined,
                    dependency:''  
                } 
            }

            config.config.dependency =  this.tableDependency.createExpectedDependency(field,config)
            
            this.tableDependency.toApplyOrRemoveDependency(config, field.value??="")

            this.fragment.fields_add(config)
        })    
    }    

    /**
     * @description Creates an array of fragments of type Field for Frames of type 'line', This function must be called every time a new line is created on the screen
     * @param {frame} frame
    */
    addLine(frame:frame){
        
        let object = this.fragment.objects_getForIdentity(frame.identity)
        
        let newLine = object.config.object.length + 1

        object.config.object.push({rucLine:newLine})

        frame.fields?.forEach(field => {
            
            field.identity = generateUUID('I') //! This instruction should not be removed from its place, otherwise there will be problems due to missing identity not created

            let config:fragmentField = {
                key: {
                    identity:field.identity,
                },
                config: {
                    alias: frame.alias,
                    fragmentObjectIdentity: frame.identity,
                    identity: field.identity,
                    propertDto: field.propertDto,
                    line: newLine,
                    dependency:''
                }    
            }

            config.config.dependency = this.tableDependency.createExpectedDependency(field,config)

            this.tableDependency.toApplyOrRemoveDependency(config, field.value ??="")

            this.fragment.fields_add(config)

        })    
    }    
        
    /**
     * @description Creates an object respecting the parent property hierarchy.
     * @return {*} 
     */
    createObject(){

        let configBase = this.pathObjectBase.find(c=> c.parent === undefined || c.parent === '')!
            
        let configFrameBase = this.fragment.objects_getForIdentity(configBase.configFrame)  

        let newObject  = Object.assign({},configFrameBase?.config.object) 
        
        this.pathObjectBase.forEach((config:{parent:string, configFrame:string }) => {
            
            let fragmentObject = this.fragment.objects_getForIdentity(config.configFrame)
            
            if(config.parent == '.'){
                insertObjectRoot()
                return
            }
            
            if(config.parent != '.' && config.parent !== undefined && config.parent !== ''){
                insertObjectParent(config.parent.split('.'),newObject)
                return
            }
            
            function insertObjectRoot(){
                newObject[fragmentObject!.config!.objectDto] = fragmentObject!.config!.object 
            }
            
            function insertObjectParent(parent:string[], newObject:any){
                
                if(parent.length == 0){
                    return
                }
                
                let propert = parent[0]
                                        
                if(parent.length == 1){
                    createPropertForObject()
                    return
                }
                
                if(parent.length > 1){

                    createPropertForPath()
                    let newPath = parent.slice(1,parent.length)
                    insertObjectParent(newPath, newObject[propert])
                    
                    return
                }
                
                function createPropertForObject(){

                    if(newObject[propert] === undefined){
                        newObject[propert] = {}   
                    }
                    newObject[propert][fragmentObject!.config.objectDto] = fragmentObject!.config.object
                }

                function createPropertForPath(){

                    if(newObject[propert] === undefined){
                        newObject[propert] = {}
                    }
                }
            }
        })
        return newObject
    }

    /**
     * @description Creates an object bringing without respecting the hierarchy of the parent property
     * @return {*} 
    */
    createObjectSeparete(){
        
        let objectSeparate = {} as any;
        
        this.pathObjectBase.forEach((config:{parent:string, alias:string, configFrame:string }) => {
            
            let configFragment  = this.fragment.objects_getForIdentity(config.configFrame)
                        
            objectSeparate[config.alias] = configFragment.config.object
        })

        return objectSeparate
    }

    createObjectForAlias(alias:string){
        
        let object  = this.fragment.objects_getForAlias(alias)
                        
        return object.config.object
    }

    setValue(fragmentField:fragmentField, value:any){
        
        let fragmentObject =  this.fragment.objects_getForIdentity(fragmentField.config.fragmentObjectIdentity)

        if(isTypeObject()){
            fragmentObject.config.object[fragmentField?.config.propertDto] = value
        }

        if(isTypeLine()){

            let line = fragmentField?.config.line!

            let item = fragmentObject.config.object.find((c:any) => c.rucLine == line)

            if(item == undefined){
                item = {rucLine:line}
                fragmentObject.config.object.push(item)
            }
            
            item[fragmentField?.config.propertDto] = value
        }

        function isTypeObject(){
            return fragmentField?.config.line == undefined
        }

        function isTypeLine(){
            return fragmentField?.config.line != undefined
        }

        this.tableDependency.toApplyOrRemoveDependency(fragmentField,value)
    }

    createConfigurationField(config:string):entityConfiguration {

        let opt = config.split('.')

        let entityConfiguration:entityConfiguration =  {
            aliasOrIDentity:opt[0],
            propertDto:opt[1],
            line: opt[2] == undefined ? undefined : Number(opt[2]) 
        }

        return entityConfiguration
    }

    getValueInObjectFragment(object:any,propertDto:string,line?:number):any {
        //! This function should only be used for fragmentObject
        for (var propert in object) {

            if (object.hasOwnProperty(propertDto) && line == undefined) {
                return object[propertDto];
            }
            if (Array.isArray(object) && line != undefined) {

                return this.getValueInObjectFragment(object[line!],propertDto)
            }

            if(typeof object === 'object') {
                return this.getValueInObjectFragment(object[propert],propertDto)
            }
        }
    }

    fieldType (identityField:string){
            
        let fragmentField = this.fragment.fields_getForIdentity(identityField)

        if(fragmentField.config.line == undefined){
            return constTypeFrame.BLOCK
        }

        return constTypeFrame.LINE
    }

    convertAliasToIdenty (config:string) {
    
        let entityConfiguration = this.createConfigurationField(config)
        let fragmentField = this.fragment.fields_getForAliasAndPropert(entityConfiguration) as fragmentField
        return fragmentField.key.identity
        
    }
    setValueContextAlias(config:string, value:any) {

        let entityConfiguration = this.createConfigurationField(config)
        let fragmentField = this.fragment.fields_getForAliasAndPropert(entityConfiguration) as fragmentField
        this.setValue(fragmentField,value)
        
    }

    setValueContextIdentity (identity:string, type:string|string[2], value:any) {

        value = convertValueType(value, type)

        let fragmentField = this.fragment.fields_getForIdentity(identity)

        this.setValue(fragmentField,value)
        this.tableDependency.toApplyOrRemoveDependency(fragmentField,value)
    }

    objectFull() {
        return this.createObject();
    }

    objectSeparate() {
        return this.createObjectSeparete() 
    }

    objectUnique(alias:string){
        return this.createObjectForAlias(alias) 
    }
    
    objectUniqueLine(alias:string,line:number) {
        let object = this.createObjectForAlias(alias)
        
        object = object[line]

        return object 
    }
    
    count(identity:string){
        
        let object = this.fragment.objects_getForIdentity(identity) 

        if(Array.isArray(object.config.object) == false){
            return -1
        }
        
        return object.config.object.length               
        }

    removeLine(identity:string, line:number){
                                    
        let objectFragment = this.fragment.objects_getForIdentity(identity) 
        
        var indexOf = objectFragment.config.object.findIndex((c:any) => c.rucLine == line)
        
        objectFragment.config.object.splice(indexOf,1)
                                
    }

    getPropert (config:string) {

        let entityConfiguration = this.createConfigurationField(config)   
        
        let fragmentField = this.fragment.fields_getForAliasAndPropert(entityConfiguration) as fragmentField
        
        let fragmentObject = this.fragment.objects_getForIdentity(fragmentField.config.fragmentObjectIdentity)
        
        let object = fragmentObject.config.object

        return fragmentObject.config.getValueInObjectFragment(object,entityConfiguration.propertDto,entityConfiguration.line) 
    }
    
    getFragmentForIdentity(identity:string):fragmentField {
        return this.fragment.fields_getForIdentity(identity)
    }

    removeFragmentsLine(objectIDentity:string, line:number){
        this.fragment.fields_removeLine(objectIDentity,line)
    }

    removeFragment(identity:string) {

        //TODO - manually tested - do automated testing
        let _fragment = this.fragment.fields_getForIdentity(identity)
        
        this.fragment.fields_remove(_fragment)

        this.tableDependency.removeExpectedDependency(identity)
    }
}