import type { StylesTemplate } from "./s-template.js";
import { SnippetsRegistry , ClawsSnippet  , type ScreenSize} from  "../backend/snippets.js"



export interface ResponsiveStyle {
    all?:Record<string, ClawsSnippet>;
    xs?:Record<string, ClawsSnippet>;
    sm?:Record<string, ClawsSnippet>;
    md?:Record<string, ClawsSnippet>;
    lg?:Record<string, ClawsSnippet>;
    xl?:Record<string, ClawsSnippet>;
    xxl?:Record<string, ClawsSnippet>;
    xxxl?:Record<string, ClawsSnippet>;
    xxxxl?:Record<string, ClawsSnippet>;
}



export class Component {

    protected responsive_styles: ResponsiveStyle = {
        all : {} ,
        xs : {} ,
        sm : {} ,
        md : {} ,
        lg : {} ,
        xl : {} ,
        xxl : {},
        xxxl : {},
        xxxxl : {}
    };


    public style( selector:string , styles:Record<string, StylesTemplate> ){

        for( const screen_size in styles ){
            const snippet:ClawsSnippet = new ClawsSnippet();
            snippet.selector = selector;
            snippet.screen = screen_size;
            snippet.styles = styles[ screen_size ]!;

            // WARNING: this may not match screen size in styles so make sure to validate this
            const SelectorStyles = this.responsive_styles[ screen_size as ScreenSize ]; 
            if ( !SelectorStyles ) {
                throw new Error(`Invalid screen size specifies ${screen_size}`);
            }

            SelectorStyles[ selector ] = snippet;
        }

    }


    public apply(){
        for( const screen_size in this.responsive_styles ){
            const SelectorStyles = this.responsive_styles[ screen_size as ScreenSize ]!;

            for( const selector in SelectorStyles ) {
                const snippet = SelectorStyles[ selector ]!;

                SnippetsRegistry.add( snippet );
            }
        }

    }


    public clone(): Component {
        const new_clone = new Component;
        new_clone.responsive_styles = this.responsive_styles;
        return new_clone;
    }


}


