import assert from 'assert';
import { ruculaGlobal } from '../global/GlobalConfig';
import { URLRucula } from './urlManagment';
import {ManagmentObject} from  '../object/ObjectManagment'
import { Fragment } from '../fragment/fragment';
import { TableDependency } from '../table-dependency/TableDependency';


var frames:any[] = [
    {
      name: "frame",
      type: "block",
      objectDto: "frame",
      alias: "aliasTestURL",
      identity:"ccss",
      fields: [
          {
          propertDto: "codigo",
          description: "Codigo"
        }
      ]
    },

]

let fragment = new Fragment(new TableDependency());

let managmentObject = new ManagmentObject(fragment, new TableDependency(), frames);

describe('urlManagment', function () {

    ruculaGlobal.initGlobalConfiguration(
    {
        environments:[{
            env:"development",
            hostname:"http://localhost",
            port: "5016"
        }],
        localizations:[{
            locales:"pt-BR",
            language:"Brasil" ,
            currency:"BRL",
            maxDecimal:5
        }]

    } as any);

  
    managmentObject.setValueContextAlias("aliasTestURL.codigo","MyValueTest")

    describe('UrlBase shold create url by controller', function () {
  
        it('createURL  ', function () {

            let button:any = {
                URL:{
                    path:'',
                    params:'codigo={aliasTestURL.codigo}'
                }
            }
            
            let url = new URLRucula(managmentObject, button.URL);

            let result = url.getURL();

            assert.equal(result,'http://localhost:5016?codigo=MyValueTest')

        })

        it('UrlBase shold create url by path', function () {

            let button:any = {
                URL:{
                    relative:'servico/venda/cliente?codigo={aliasCliente.codigo}',
                }
            }
             let result = new URLRucula(managmentObject, button.URL);

          })
    })    
});
