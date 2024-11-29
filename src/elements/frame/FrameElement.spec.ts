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
import {FrameElementLine} from  './FrameElementLine'      
import { FrameEvent } from './FrameEvent';
import expect from 'expect';

describe('FrameElement',function(){
  
  let frameBlock: frame = {
      identity: "r-903849480",
      name: "Header OS",
      type:"block",
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
        }
      ]
  } as any

  let frameLine:frame = {
    identity: "r-9038453435",
    name: "Serviços Prestados",
    type: "line",
    objectDto: "itensServico",
    alias: "itensServico",
    layout: { col: { start: 1, end: 1 }, row: { start: 1, end: 1 } },
    parent: ".",
    fields: [
      {
        propertDto: "descricao",
        description: "Descrição",
        maxLength: 100,
        requerid: true,
        type: "text"
      },
      {
        propertDto: "val",
        description: "val",
        maxLength: 100,
        requerid: true,
        type: "text"
      }
    ]
  } as any
  
  const frames = [frameBlock,frameLine]
  
  let prefixeTest = 'rucula_prefixe__0341298'
  let globaRucula = document.createElement('div')
  
  let tableDependency  = new TableDependency();
  let fragment = new Fragment(tableDependency);
  let managmentObject = new ManagmentObject(fragment,tableDependency,frames);
  let field = new Field(managmentObject,globaRucula);
  let frameEvent = new FrameEvent(managmentObject);
  let popup = new Popup(prefixeTest);
  let button = new Button(() => {},popup,prefixeTest);
  let menuContext = new MenuContext(prefixeTest);
  let fieldMenuContext = new FieldMenuContext(popup,menuContext,prefixeTest);
  
  describe('Frame Block', function(){
    
    let frameElementBlock = new FrameElementBlock(managmentObject,field,frameEvent,button,fieldMenuContext);        
    let frameBlockElement = frameElementBlock.create(frameBlock)
    
    it('should contain class r-q-b', function(){
      
      var containRQB = frameBlockElement.classList.contains('r-q-b')
      expect(containRQB).toBe(true)
    })
    
    it('should contain atribute identity', function(){
        
      let identity = frameBlockElement.getAttribute('identity')
      
      expect(identity).toMatch(/^RUCF/)
    })
    
    it('should contain title H3', function(){
      
      let H3 = frameBlockElement.querySelector('h3')
      
      expect(H3?.nodeName).toMatch('H3')
      expect(H3?.classList.contains('r-t-f')).toBe(true)
    })

    it('should contain DIV for itens Input', function(){
      
      let div = frameBlockElement.querySelector('.r-q-i')
      
      expect(div?.nodeName).toBe('DIV')
    })
  })

  describe('Type Line', function (){
    
    let frameElementLine = new FrameElementLine(managmentObject,field,frameEvent,button,fieldMenuContext,prefixeTest);        
    let frameBlockLine = frameElementLine.create(frameLine)

    
    it('should contain class r-q-l', function(){
      
      var containRQL = frameBlockLine.classList.contains('r-q-l')
      expect(containRQL).toBe(true)
    })
    
    
    it('should contain node TABLE', function(){
        
      let identity = frameBlockLine.getAttribute('identity')
      
      expect(identity).toMatch(/^RUCF/)
    })

    it('should contain title H3', function(){
      
      let H3 = frameBlockLine.querySelector('thead tr th h3')
      
      expect(H3?.nodeName).toMatch('H3')
      expect(H3?.classList.contains('r-t-f')).toBe(true)
    })

    it('should contain TH with attribute value colspan  equal at the   fields length  configuration of frame', function(){
      
      const FIRST_TH_DEFAULT = 1;

      let th = frameBlockLine.querySelector('thead tr th.title')
      
      let  thLength = th?.getAttribute('colspan')
      
      expect(Number(thLength)).toBe(frameLine.fields!.length + FIRST_TH_DEFAULT)
    })

    it('TH should contain class title', function(){
      
      let th = frameBlockLine.querySelector('thead tr th.title')
            
      expect(th?.tagName).toBe('TH')
    })


    describe('Button Action Create and Delete', function () {
      
      it('TD should contain attribute ruc-action', function(){
      
        let tdAction = frameBlockLine.querySelector('tbody tr td')
        
        let attRucAction = tdAction?.getAttribute('ruc-action');
        expect(attRucAction).toBe('')
      })
  
      it('your div should contain attribute id equal at identity of frame Line', function(){
        
        var identity = frameBlockLine.getAttribute('identity')
        
        let div = frameBlockLine.querySelector('tbody tr td div')

        expect(div!.id).toBe(identity)        
      })

      it('your div should contain anchor add and anchor remove', function(){
        
        
        let divButtonAction = frameBlockLine.querySelector('tbody tr td div')

        let  add = divButtonAction?.querySelector('#f-l-action-add')
        let remove = divButtonAction?.querySelector('#f-l-action-remove')

        expect(add?.outerHTML).toBe('<a class="add" id="f-l-action-add"><i class="bi bi-plus-lg"></i></a>')        
        expect(remove?.outerHTML).toBe('<a class="remove" id="f-l-action-remove"><i class="bi bi-trash"></i></a>')        
      })
    })
  })
})
