import { field } from "../entities/form/field";
import { fragmentField } from "../object/ObjectAliases";

type dependency = {
    identityObject:string,
    isHibernate:boolean,
    fieldsNotResolved:string[]
}

export class  TableDependency {


    private dependencyesNotResolved:dependency[] = []
    
    private REQUERID:string = '1' as const;
    private MAX_LENGHT:string = '2' as const;
    private MAX:string = '3' as const;
    private MIN:string = '4' as const;

    
    moveImbernateToNotResolved(identityObject:string){

        let dependency = this.dependencyesNotResolved.find(c=> c.identityObject == identityObject)

        if(dependency){
            dependency.isHibernate = false
        } 
    }

    moveNotResolvedToImbernate(identityObject:string){

        let dependency = this.dependencyesNotResolved.find(c=> c.identityObject == identityObject)
        if(dependency){
            dependency.isHibernate = true
        }        
    }

    public  createExpectedDependency(field:field, fragmentField:fragmentField):string {   
    
        let REQUERID = this.REQUERID
        let MAX_LENGHT = this.MAX_LENGHT
        let MAX = this.MAX
        let MIN = this.MIN
        
        //! Important!! This function must be called in the fragmentField creation process

        let valueDependency = ''
        
        checkIsRequerid();
        checkMaxLength();
        checkMax();
        checkMin();
        
        function checkIsRequerid(){
            if(field.requerid)
                valueDependency += `${REQUERID},`
        }
    
        function checkMaxLength(){
            
            if(field.maxLength as number > 0)
                valueDependency += `${MAX_LENGHT}:${field.maxLength},`
        }
    
        function checkMax(){
    
            if(field.max as number > 0) 
                valueDependency += `${MAX}:${field.max},`
        }
    
        function checkMin(){
            
            if(field.min as number > 0)
                valueDependency += `${MIN}:${field.min},`
        }
    
        valueDependency = this.removeLastComa(valueDependency)
                
        if(valueDependency){

            let index = this.dependencyesNotResolved.findIndex(c=> c.identityObject == fragmentField.config.fragmentObjectIdentity)            
            if( index == -1){
                
                let objectDependency:dependency = {
                    isHibernate:false,
                    identityObject:fragmentField.config.fragmentObjectIdentity,
                    fieldsNotResolved:[field.identity]  
                }
                this.dependencyesNotResolved.push(objectDependency)
            }
            if( index != -1){
                
               let indexDependency = this.dependencyesNotResolved[index].fieldsNotResolved.findIndex(c => c == field.identity) 
                
               if(indexDependency == -1){
                    this.dependencyesNotResolved[index].fieldsNotResolved.push(field.identity)
               }
            }            
        }

        return valueDependency
    }    

    toApplyOrRemoveDependency(fragment:fragmentField, value:string|number|boolean){

        let REQUERID = this.REQUERID
        let MAX_LENGHT = this.MAX_LENGHT
        let MAX = this.MAX
        let MIN = this.MIN

        let dependencyExpected = fragment.config.dependency

        let dependencyResolved = ''
    
        dependencyExpected
        .split(',')
        .forEach(expected => {
    
            let identification = expected.split(':')[0]
            
            if(identification == REQUERID){
                
                let result = this.consistRequerid(value)
                
                if(result){
                    dependencyResolved += `${REQUERID},`
                }
            }
    
            if(identification == MAX_LENGHT){
                
                let result = this.consistMaxLen(dependencyExpected,value);
            
                if(result){
                    dependencyResolved += `${MAX_LENGHT},`
                }            
            }

            if(identification == MAX){
                
                let result = this.consistMax(dependencyExpected,value as string);
            
                if(result){
                    dependencyResolved += `${MAX},`
                }            
            }
            
            if(identification == MIN){
                
                let result = this.consistMin(dependencyExpected,value as string);
            
                if(result){
                    dependencyResolved += `${MIN},`
                }            
            }
        })
                
        dependencyResolved = this.removeLastComa(dependencyResolved)

        let dependencyExpectedOnlyKeys = dependencyExpected.split(',').map(c => c.split(':')[0])
        
        let dependencyResolvedOnlyKeys = dependencyResolved.split(',').map(c => c.split(':')[0])
        
        let existDependecy = false

        for (let index = 0; index < dependencyExpectedOnlyKeys.length; index++) {
            
            let indexOf = dependencyResolvedOnlyKeys.indexOf(dependencyExpectedOnlyKeys[index])

            if(indexOf == -1){
                existDependecy = true
                break;
            } 
        }

        let dependencyObject = this.dependencyesNotResolved.find(objectDep => objectDep.identityObject == fragment.config.fragmentObjectIdentity)
        
        let dependency = dependencyObject?.fieldsNotResolved.find(dependency => dependency == fragment.key.identity)

        if(existDependecy == true && dependency ==  undefined){
            dependencyObject?.fieldsNotResolved.push(fragment.key.identity)
        }

        if(existDependecy == false && dependency !=  undefined){
            let index = dependencyObject?.fieldsNotResolved.indexOf(dependency) as number
            dependencyObject?.fieldsNotResolved.splice(index ,1)
        }      

        return existDependecy
    }

    removeLastComa(value:string){
        return value.replace(/, *$/,'')
    }
    
        
    private getValueInDependency(dependencyExpected:string){
        return dependencyExpected.split(':')[1]
    }
        
    consistRequerid(value:string|number|boolean) {
       
        if( value == undefined || value as number == 0){
            //todo implement event
            return false;
        }
        return true;
    }
            
    consistMaxLen(dependencyExpected:string,value:string|number|boolean){
                
        let maxLength = this.getValueInDependency(dependencyExpected)
        
        value = this.addValueDefault().typeString((value))

        if ((value as string).length > Number(maxLength)){
            //todo implement event
            return  false;
        }
        
        return true;
    }

    consistMax(dependencyExpected:string,value:string|number) {

        let max = this.getValueInDependency(dependencyExpected)
        
        value = Number(this.addValueDefault().typeNumber((value)))

        if(Number.NaN == value){
            alert('value not is number')
            return false
        }

        if (value > Number(max)){
            //todo implement event
            return  false
        }

        return true
    }
    
    consistMin(dependencyExpected:string,value:string|number){

        let max = this.getValueInDependency(dependencyExpected)

        value = Number(this.addValueDefault().typeNumber((value)))


        if(Number.NaN == value){
            alert('value not is number')
            return false
        }

        if (value < Number(max)){
            //todo implement event
            return  false;
        }
        
        return true
    }
    
    addValueDefault(){
        return {
            typeString: (value:any) => {

                if(value == undefined){
                    return '' 
                }

                return value
            },
            typeNumber: (value:any) => {
                if(value == undefined){
                    return 0 
                }

                return value
            }      
        }
    }
    
    removeExpectedDependency (identity:string) {
        
        let dependency = this.dependencyesNotResolved.find(c=> c.fieldsNotResolved.indexOf(identity) > -1)

        if(dependency){
            
            let index = dependency.fieldsNotResolved.indexOf(identity)

            if(index > -1){

                dependency.fieldsNotResolved.splice(index,1)
            }   
        }
    }
       
    getDependenciesNotResolded(){ 
        return this.dependencyesNotResolved
    }
    
    dependenciesCount() {
        return this.dependencyesNotResolved
        .filter(c=> c.fieldsNotResolved.length > 0).length
    }       
}