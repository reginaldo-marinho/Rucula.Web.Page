import { frame } from '../entities/form/frame';
import { window } from '../entities/form/window';

'use strict';

export let configWindow = (() => {
    
    let windows = new Map();
    
    return {
        
        set:(window:window,P:string) => {
         
            let mappedwindow = windows.get(P)
            
            if(mappedwindow){
                return
            }

            windows.set(P,window)
        },
        
        get:(P:string)=> {
            return windows.get(P)
        },

        frame: {
            get: (identity:string,P:string):frame => {
                
                let window = windows.get(P) as window
                let frame = window.frames.find(c=> c.identity == identity)
                return frame as frame
            }
        }
    }
})()