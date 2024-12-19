import { enviroment } from "../entities/global/Enviroments";
import { globalConfiguration } from "../entities/global/GlobalConfiguration";
import { localization } from "../entities/global/Localization";

export let ruculaGlobal = (() => {

    let configuration:globalConfiguration;

    function checkLocalizations(localizations:localization[]){
        
        if(localizations.length == 0){
            throw new Error ("🌿 localization must be informed")
        }
    }
    function checkEnvironments(environments:enviroment[]){
        
        if(environments.length == 0){
            alert('não há ambientes no momento')
            throw new Error ("🌿 environment must be informed")
        }
    }    

    return {

        initGlobalConfiguration: function (config:globalConfiguration){
            configuration = config;
            ruculaGlobal.setEnviroment();
            ruculaGlobal.setLocalization();
        },
        setLocalization: function(locales:string|number = 0): void {
       
            checkLocalizations(configuration.localizations)

            if(typeof locales === "number"){
                configuration.chosenLocalization = configuration.localizations[0]
                return;
            }
            
            let loc = configuration.localizations.find(c => c.locales === locales)!;

            if(loc == undefined || loc == null){
                throw new Error ("🌿 localization not found")
            }
            configuration.chosenLocalization = loc;  
        },

        setEnviroment: function(enviroment:string|number = 0): void {
            
            checkEnvironments(configuration.environments);
                        
            if(typeof enviroment === "number"){
                configuration.chosenEnvironment = configuration.environments[0]
                return;
            }
            
            let env =  configuration.environments.find(c => c.env === enviroment)!;
            if(env == undefined || env == null){

                var manualEnviroment = prompt('Ambiente não existe, considere outras alternativas!', configuration.environments[0].env);
                
                if(manualEnviroment == null){
                    throw new Error ("🌿 environment not found")
                }

                ruculaGlobal.setEnviroment(manualEnviroment)
            }
            
            configuration.chosenEnvironment = env;  
        },
        
        getEnvironment:function (){
            return configuration.chosenEnvironment;
        },

        getLocalization:function (){
            return configuration.chosenLocalization;
        },
        getConfigurationGlobal:function (){
            return configuration;
        }
    }
})()
