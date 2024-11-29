import { Button } from '../../buttons/Button';
import { frame } from '../../entities/form/frame';
import { Fragment } from '../../fragment/fragment';
import { MenuContext } from '../../menu-context/menu-context';
import { ManagmentObject } from '../../object/ObjectManagment';
import { Popup } from '../../popup/popup';
import { TableDependency } from '../../table-dependency/TableDependency';
import { Field } from '../form/Field';
import { FieldMenuContext } from '../form/Field/fieldMenuContext';
import {FrameElementBlock} from  './FrameElementBlock'      
import { FrameEvent } from './FrameEvent';
import expect from 'expect';

describe('FragmentElementBlock',function(){

    let fram: frame = {
        identity: "r-903849480",
        name: "Header OS",
        objectDto: "ordemDeServico",
        alias: "ordemDeServico",
        layout: { col: { start: 1, end: 1 }, row: { start: 1, end: 1 } },
        fields: [
          {
            propertDto: "codigo",
            description: "Código",
            maxLength: 40,
            information: "Use guuid 😃👍🏻",
            requerid: true,
            type: "text"
          },
          {
            propertDto: "dataAbertura",
            description: "Data de Abertura",
            type: "date"
          }
        ]
    } as any

    let prefixeTest = 'rucula_prefixe__0341298'
    let globaRucula = document.createElement('div')
    
    let tableDependency  = new TableDependency();
    let fragment = new Fragment(tableDependency);
    let managmentObject = new ManagmentObject(fragment,tableDependency);
    let field = new Field(managmentObject,globaRucula);
    let frameEvent = new FrameEvent(managmentObject);
    let popup = new Popup(prefixeTest);
    let button = new Button(() => {},popup,prefixeTest)
    let menuContext = new MenuContext(prefixeTest);
    let fieldMenuContext = new FieldMenuContext(popup,menuContext,prefixeTest);
    let frameElementBlock = new FrameElementBlock(managmentObject,field,frameEvent,button,fieldMenuContext);        
    
    managmentObject.initObjects([fram])

    describe('Frame Block', function(){

      let frameBlock = frameElementBlock.create(fram)
      
      it('should contain atribute identity', function(){
          
        let identity = frameBlock.getAttribute('identity')
  
          expect(identity).toMatch(/^RUCF/)
      })
    })
})