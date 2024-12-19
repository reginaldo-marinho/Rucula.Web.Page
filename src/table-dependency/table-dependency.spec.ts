import assert from 'assert';
import { TableDependency } from './TableDependency';
import { field } from '../entities/form/field';
import { fragmentField } from '../object/ObjectAliases';

let table = new TableDependency();

describe('TableDependency', function () {

    describe('object', function () {
  
      it('createExpectedDependency should create expectations of dependencies for the field', function () {
        
        let fragment = {
          config: {
              dependency:''
          }
        }    

        let field = {
          requerid: true,
          maxLength: 12,
          max: 2,
          min: 1
        } as field
        
        let expected = table.createExpectedDependency(field,fragment as any)
        
        assert.equal(expected,'1,2:_:12,3:_:2,4:_:1')
      })
      
      it('createExpectedDependency must return true when option is 1, and value is empty, null or undefined', function () {
            
        let fragment = {
          config: {
              dependency:''
          }
        }    

        let field = {
          requerid: true,
        } as field
        
        let createExpectedDependency = table.createExpectedDependency(field,fragment as any)

        let fragmentField:fragmentField = {
          key : {
            identity:'qw12ere2w1'
        },
        config:{
            fragmentObjectIdentity: '', 
            alias:'',
            identity: '',
            propertDto:'',
            line: undefined,
            dependency:createExpectedDependency
          }    
        }

        let toApply0 = table.toApplyOrRemoveDependency(fragmentField,'')
        let toApply1 = table.toApplyOrRemoveDependency(fragmentField,'1')
        let toApply3 = table.toApplyOrRemoveDependency(fragmentField,'scs')
        let toApply5 = table.toApplyOrRemoveDependency(fragmentField,'scsccs')
        
        assert.equal(toApply0,true)
        assert.equal(toApply1,false)
        assert.equal(toApply3,false)
        assert.equal(toApply5,false)


      });

      it('createExpectedDependency must return true when option is 2:_:2, and value is superior', function () {
           
        let fragment = {
          config: {
              dependency:''
          }
        }   

        let field = {
           maxLength: 2,
        } as field
        
        let createExpectedDependency = table.createExpectedDependency(field,fragment as any)

        let fragmentField:fragmentField = {
          key : {
            identity:'qw12ere2w1'
        },
        config:{
            fragmentObjectIdentity: '', 
            alias:'',
            identity: '',
            propertDto:'',
            line: undefined,
            dependency:createExpectedDependency
          }    
        }

        let toApply = table.toApplyOrRemoveDependency(fragmentField,'VAL')
        assert.equal(toApply,true)
      });

      it('createExpectedDependency must return true when option is 3:_:5, and value is superior', function () {
           
        let fragment = {
          config: {
              dependency:''
          }
        }  

        let field = {
           max: 5,
        } as field
        
        let createExpectedDependency = table.createExpectedDependency(field,fragment as any)

        let fragmentField:fragmentField = {
          key : {
            identity:'qw12ere2w1'
        },
        config:{
            fragmentObjectIdentity: '', 
            alias:'',
            identity: '',
            propertDto:'',
            line: undefined,
            dependency:createExpectedDependency
          }    
        }

        let toApply = table.toApplyOrRemoveDependency(fragmentField,99)
        assert.equal(toApply,true)
      });

      it('createExpectedDependency must return true when option is 4:_:1, and value is superior', function () {
            
        let fragment = {
          config: {
              dependency:''
          }
        }  
        let field = {
           min: 1,
        } as field
        
        let createExpectedDependency = table.createExpectedDependency(field,fragment as any)

        let fragmentField:fragmentField = {
          key : {
            identity:'qw12ere2w1'
        },
        config:{
            fragmentObjectIdentity: '', 
            alias:'',
            identity: '',
            propertDto:'',
            line: undefined,
            dependency:createExpectedDependency
          }    
        }

        let toApply = table.toApplyOrRemoveDependency(fragmentField,-1)
        assert.equal(toApply,true)
      });
    })    
});
