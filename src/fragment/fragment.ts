import { clone } from "../common/cloneObject";
import { entityConfiguration, fragmentField, fragmentObject } from "../object/ObjectAliases";
import { TableDependency } from "../table-dependency/TableDependency";

export class Fragment {

    constructor(tableDependency:TableDependency) {
        this.tableDependency = tableDependency
    }

    private tableDependency:TableDependency
    objects: Array<fragmentObject> = new Array<fragmentObject>();
    fields: Array<fragmentField> = new Array<fragmentField>();
    
    checkIdentity(identity:string){
        if(identity === undefined){
            throw new Error('identity is requerid')   
        }
    }

    objects_add(object:fragmentObject){

        this.checkIdentity(object.key.identity)
        
        let exist = this.objects.find( c => c.key.identity == object.key.identity)

        if(exist){
            throw new Error('Object identity exists!!!');
        }

        this.objects.push(object)
    }

    objects_getForFieldIdentity(identity:string):fragmentObject{

        let field = this.fields_getForIdentity(identity)
        
        return this.objects_getForIdentity(field.config.fragmentObjectIdentity)
    }
    
    objects_getForIdentity(identity:string):fragmentObject{

        if(identity === undefined){
            throw new Error('identity requerid!');
        }

        let object = this.objects.find( c => c.key.identity == identity)

        if(object){
            return object
        }

        throw new Error("Object not Found");
    }
    objects_getForAlias(alias:string):fragmentObject{

        if(alias === undefined){
            throw new Error('alias is requerid')   
        }
        
        let object  = this.objects.find( (c:any )=> c.key.alias == alias)

        if(object) {
            return object
        }

        throw new Error('object not found')   
    }

    fields_add(field:fragmentField){

        this.checkIdentity(field.key.identity)

        let exist = this.fields.find( c => c.key.identity == field.key.identity)

        if(exist){
            throw new Error('Field identity exists!!!');
        }

        this.fields.push(field)
    }

    fields_remove(fragment:fragmentField){
        let index = this.fields.indexOf(fragment)

        if(index > -1){
            this.fields.splice(index,1)
        }
    }
    fields_removeLine(objectIDentity:string, line:number, ){
        
        let _fields = this.fields.filter(item => item.config.fragmentObjectIdentity == objectIDentity && item.config.line == line)

        _fields.forEach(field => {
            
            let indexOf = this.fields.indexOf(field)

            if(indexOf > -1){
                this.tableDependency.removeExpectedDependency(field.key.identity)
                this.fields.splice(indexOf,1)
            }
        })
    }
        /**
     * @param {string} identity
     * @return {fragmentField} 
     */
    fields_getForIdentity(identity:string):fragmentField{

        if(identity === undefined){
            throw new Error('identity is requerid')   
        }

        let field = this.fields.find( c => c.key.identity == identity)

        if(field){
            return field
        }

        throw new Error("field not Found");
        
    }
    /**
     * @param {entityConfiguration} config
     * @return {fragmentField} 
    */
    fields_getForAliasAndPropert (config:entityConfiguration){

        if(config === undefined){
            throw new Error('entityConfiguration is requerid')   
        }

        return  this.fields.find((c:any) => 
            c.config.alias == config.aliasOrIDentity &&
            c.config.propertDto == config.propertDto &&
            c.config.line == config.line)
    }

    snapshot(){
        
        for (let index = 0; index < this.objects.length; index++) {
            this.objects[index].config.objectSnapshot = clone(this.objects[index].config.object);
        }

        for (let index = 0; index < this.fields.length; index++) {
            this.fields[index].config.dependencySnapshot = this.fields[index].config.dependency
        }
    }

    revertToInit(){
        
        for (let index = 0; index < this.objects.length; index++) {
            this.objects[index].config.object = clone(this.objects[index].config.objectSnapshot);
        }

        for (let index = 0; index < this.fields.length; index++) {
            this.fields[index].config.dependency = this.fields[index].config.dependencySnapshot ?? ''
        }
    }
}