export type ClawsPlugin = (input:any)=>Record<string,string>;
export type ClawsPluginsMap = Map<string, ClawsPlugin> ;



export class ClawsPluginRegistry {

    protected static registry:ClawsPluginsMap = new Map;

    public static dump() : ClawsPluginsMap {
        return ClawsPluginRegistry.registry;
    }

    public static register( key:string , plugin_function:ClawsPlugin ){
       ClawsPluginRegistry.registry.set(key , plugin_function );
    }

    public static applyPlugins( key:string , value:any ):Record<string,string> {
        const plugin:ClawsPlugin | undefined = ClawsPluginRegistry.registry.get(key);

        if ( !plugin ) {
            const result:Record<string,string> = {};
            result[ key ] = value.toString();
            return  result;
        }

        return plugin( value );
    }

    public static listPlugins() : string[] {

        let supported_claws_plugins = [];
        for (const virtual_css_property in this.registry) {
            supported_claws_plugins.push( virtual_css_property );
        }

        return supported_claws_plugins;
    }

}

