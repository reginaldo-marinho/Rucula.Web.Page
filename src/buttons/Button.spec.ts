import expect from 'expect';
import {ElementButton} from './ElementButton'
import {ElementLink} from './ElementLink'
import {button} from '../entities/form/button'


describe('ElementButton', function (){

  
  describe('Element type button',function (){
    
    let btn = new ElementButton(); 

    it('button have contain class r-b-i', function(){

      let defaultSave:button = {
          "type": "button",
          "target": "myTarget",
      };

      let elementSave = btn.createElement(defaultSave);
    
      let classRuculaButtonItem = elementSave.classList.contains('r-b-i');

      expect(classRuculaButtonItem).toBe(true)     
    
    });

    it('should create button', function (){
      
      let specificButton:button = { 
          "text": "MyTest",
          "type": "button",
          "target": "finalll",
          "icon": "bi bootstrap-icon-test"
      }

      let elementSpecific = btn.createElement(specificButton)
      expect(elementSpecific.outerHTML).toBe('<button class="r-b-i" type="button" id="finalll"><i class="bi bootstrap-icon-test"> </i><span>MyTest</span></button>') 
    }) 

    it('should create button without tag i(icon)', function (){
      
      let specificButton:button = {
          "text": "Without ICon",
          "type": "button",
          "target": "withoutIcon"
      }
      
      let elementSpecific = btn.createElement(specificButton)
      expect(elementSpecific.outerHTML).toBe('<button class="r-b-i" type="button" id="withoutIcon"><span>Without ICon</span></button>') 
    })
  })
  describe('Element type Link', function () {
    
    let link = new ElementLink(); 

    it('should create link', function (){
      
      let linkButton:button = {
          "text": "Documentation",
          "type": "link",
          "link":"https://github.com/reginaldo-marinho",
          "target": "myTarget"
      }
      
      let elementLink = link.createElement(linkButton)
      expect(elementLink.outerHTML).toBe('<a href="https://github.com/reginaldo-marinho" class="btn-link" target="_blank">Documentation</a>') 
    })

    it('should contain class btn-link', function (){
      
      let linkButton:button = {
          "text": "TestClass",
          "type": "link",
          "link":"",
          "target": "myTarget"
      }

      let elementLink = link.createElement(linkButton)
      let containClassBtnLink = elementLink.classList.contains('btn-link')

      expect(containClassBtnLink).toBe(true) 
    })


  })
})