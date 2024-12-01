import { ruculaGlobal } from '../global/GlobalConfig';
import { URLRucula } from './urlManagment';
import {ManagmentObject} from  '../object/ObjectManagment'
import { Fragment } from '../fragment/fragment';
import { TableDependency } from '../table-dependency/TableDependency';
import expect from 'expect';
import { buttonURL } from '../entities/form/button';

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
            },
            {
                propertDto: "description",
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
    managmentObject.setValueContextAlias("aliasTestURL.description","My Description for Test")

    describe('Estruture of creation URL', function () {


        it('if  object URL null or empity, return absolute path global configuration', function () {

            let URL = {} as buttonURL
        
            let url = new URLRucula(managmentObject, URL);

            let result = url.getURL();

            expect(result).toBe('http://localhost:5016')

        })
        it('if only propert absolute should, use this', function () {

            let URL = 
            {
                absolute:'www.contoso.com',
            } as buttonURL
        
            let url = new URLRucula(managmentObject, URL);

            let result = url.getURL();

            expect(result).toBe('www.contoso.com')

        })

        it('if only propert relative should use URL base of the global configuration', function () {

            let URL = 
            {
                relative:'client/status',
            } as buttonURL
        
            let url = new URLRucula(managmentObject, URL);

            let result = url.getURL();

            expect(result).toBe('http://localhost:5016/client/status')

        })

        it('if contain property  relative and absolute should use the twos properties', function () {

            let URL = 
            {
                absolute:'www.contoso.com',
                relative:'client/status',
            } as buttonURL
        
            let url = new URLRucula(managmentObject, URL);

            let result = url.getURL();

            expect(result).toBe('www.contoso.com/client/status')
        })

        it('createURL', function () {

            let URL = 
            {
                relative:'cliente/{aliasTestURL.codigo}',
            } as buttonURL
            
            let url = new URLRucula(managmentObject, URL);

            let result = url.getURL();

            expect(result).toBe('http://localhost:5016/cliente/MyValueTest')

        })

        it('UrlBase shold create url by path', function () {

            
            let URL = {
                relative:'servico/venda/cliente?codigo={aliasTestURL.codigo}'
            } as buttonURL
            

             let url = new URLRucula(managmentObject, URL);

             let newqUrl = url.getURL()
             expect(newqUrl).toBe('http://localhost:5016/servico/venda/cliente?codigo=MyValueTest')
        })

        it('use alias and propert for get value in object', function (){

            let URL = {
                absolute: 'www.test.com/{aliasTestURL.codigo}/?description={aliasTestURL.description}'
            } as buttonURL
            
            let url = new URLRucula(managmentObject, URL);

            let newqUrl = url.getURL()
            expect(newqUrl).toBe('www.test.com/MyValueTest/?description=My Description for Test')
        })
    })    
});
