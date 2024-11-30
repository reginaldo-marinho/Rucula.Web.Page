
import  {WindowBaseDOM} from './WindowBase'
import expect from 'expect';

describe ('Window Base', function (){
    
    it('grid not should contain grid if openLeftGrid is false', function (){
        
        var div = document.createElement('div');
        
        new WindowBaseDOM("eee2035835-90", {
            globalWindow:div,
            openLeftGrid: false,
            windowName: ''
        })
    
        let grid = div.querySelector("#eee2035835-90actions")
    
        expect(grid).toBe(null)
    })

    var globalWindow = document.createElement('div');

    const  prefixe = "rucula_23-390-50"

    new WindowBaseDOM(prefixe, {
        globalWindow:globalWindow,
        openLeftGrid: true,
        windowName: 'hello world test'
    })
})