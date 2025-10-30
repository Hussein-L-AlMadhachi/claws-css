
export type ScreenSize = "xs"|"sm"|"md"|"lg"|"xl"|"xxl"|"xxxl"|"xxxxl"|"all"



export interface SnippetsDump {
    all:string;
    xs:string;
    sm:string;
    md:string;
    lg:string;
    xl:string;
    xxl:string;
    xxxl:string;
    xxxxl:string;
}



export class ClawsSnippet {
    public styles:Record<string, string> = {};
    public animation: Record<number , Record<string , string> >|null = null;
    public selector:string = "";
    public screen:string = "all"; 
    public wrapper:string|null = null;

    public toString(){
        if ( ! this.animation ) return this.dumpRawStyling();
        return this.dumpRawCSSAnimations();
    }

    protected dumpRawStyling () {
        let renderedStyles:string = "";

        for ( const css_property in this.styles ){
            renderedStyles += `  ${css_property}:${this.styles[css_property]};\n`
        }

        return `${this.selector}{\n${renderedStyles}}\n`;
    }

    protected dumpRawCSSAnimations() {
        let renderedStyles:string = "";

        if( this.animation === null ) throw new Error("Internal Error: this is treated as normal styles but ClawsSnippet. (if you're a user, please report this)");

        for ( const frame in this.animation ){
            renderedStyles += `  ${frame}% {\n`;

            for ( const css_property in this.animation[frame] ){
                renderedStyles += `    ${css_property}:${this.animation[frame]![css_property]};\n`
            }

            renderedStyles += `  }\n`;
        }

        return `@keyframes ${this.selector}{\n${renderedStyles}}\n`;
    }
}



type Registry = Record< string , Record<string , ClawsSnippet> > ;

export class SnippetsRegistry {
    
    protected static registry:Registry = {
        all: {},
        xs: {},
        sm: {},
        md: {},
        lg: {},
        xl: {},
        xxl: {},
        xxxl: {},
        xxxxl: {},
    };

    /**
     * dumps all the CSS catagorized by screen size selectors for the compiler to add 
     * proper media queries and set styles
     * 
     * @returns an Object of the CSS catagorized by screen size selectors
     */
    public static dumpStyles() : SnippetsDump {
        let exported_Styles : SnippetsDump = {
            "all" : "" ,
            "xs" : "" ,
            "sm" : "" ,
            "md" : "" ,
            "lg" : "" ,
            "xl" : "" ,
            "xxl" : "",
            "xxxl" : "",
            "xxxxl" : ""
        }

        for( const screen_size in SnippetsRegistry.registry ){
            const selectorsMap = SnippetsRegistry.registry[ screen_size ]!;

            if ( !selectorsMap ) SnippetsRegistry.registry[ screen_size ] = {};

            for( const selector in selectorsMap ) {
                const snippet = selectorsMap[ selector ]!;

                exported_Styles[snippet.screen as keyof SnippetsDump] += `${snippet}`;

            }

        }

        return exported_Styles;
    }

    /**
     * add a new snippet you wanna add to the global registry
     * @param snippet the snippet you wanna add to the global registry
     * @returns
     */
    public static add( snippet:ClawsSnippet ) : void {
        const selectorMap = SnippetsRegistry.registry[ "all" ];

        if( !selectorMap ) throw new Error("Interanl Error: invalid screen size in the internal snippet. If you're a user of this framework, please report this issue.")
        SnippetsRegistry.registry[ snippet.screen ]![ snippet.selector ] = snippet;
    }

}


