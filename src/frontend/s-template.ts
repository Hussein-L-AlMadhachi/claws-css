import { ClawsPluginRegistry } from "./plugin.js";

export type StylesTemplate = Record<string , string>;



export function s(properties: TemplateStringsArray, ...values: any[]) {

    let values_index = 0;
    let result:StylesTemplate = {};

    for( const property of properties ){
        if( !property ) return result;

        const value = values[ values_index ];
        
        if ( value === undefined ){
            continue;
        }
        values_index++;

        let styles = ClawsPluginRegistry.applyPlugins( property.trim() , value );

        result = { ...result , ...styles };
    }
    
    return result;
}

