import { Button } from '../buttons/Button';
import { frame } from '../entities/form/frame';
import { Fragment } from '../fragment/fragment';
import { ManagmentObject } from '../object/ObjectManagment';
import { TableDependency } from '../table-dependency/TableDependency';
import expect from 'expect';

describe('ObjectManagment', function () {
    
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
  
  let tableDependency  = new TableDependency();
  let fragment = new Fragment(tableDependency);
  let managmentObject = new ManagmentObject(fragment,tableDependency,frames);
  
  it('should set e get value  ', function (){  
      let valCodigo = "1728847y784y"
        
      managmentObject.setValueContextAlias("ordemDeServico.codigo",valCodigo)
      
      let codigo = managmentObject.getPropert("ordemDeServico.codigo")
     
      expect(codigo).toBe('1728847y784y')
  })
  

})
