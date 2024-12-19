import { enviroment } from "./Enviroments";
import { localization } from "./Localization";

export interface globalConfiguration{
    floatLabel: boolean
    localizations:localization[];
    environments:enviroment[];
    chosenLocalization:localization ;
    chosenEnvironment:enviroment;
}