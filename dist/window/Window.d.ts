import { frame } from '../entities/form/frame';
import { window } from '../entities/form/window';
export declare let configWindow: {
    set: (window: window, P: string) => void;
    get: (P: string) => any;
    frame: {
        get: (identity: string, P: string) => frame;
    };
};
