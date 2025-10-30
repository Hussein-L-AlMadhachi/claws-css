import type { StylesTemplate } from "./s-template.js";
import { SnippetsRegistry , ClawsSnippet } from  "../backend/snippets.js"


export class KeyFrame {
    public name:string;
    
    constructor( name:string , animation_styles:Record<number, StylesTemplate> ){
        this.name = name;

        const snippet:ClawsSnippet = new ClawsSnippet();
        snippet.selector = name;
        snippet.animation = animation_styles;
        SnippetsRegistry.add( snippet );
    }

}
