import * as fs from "node:fs";
import { type ScreenSize , type SnippetsDump , SnippetsRegistry } from "./snippets.js";



let enable_max_query:boolean = false;

export function EnableDesktopFirst() {
    enable_max_query = true;
}



let min_media_queries_lookup: Record<ScreenSize , string> = {
    all:"", // just to make the TS compiler shut up
    xs : "@media screen and (min-width: 319px)",
    sm : "@media screen and (min-width: 568px)",
    md : "@media screen and (min-width: 768px)",
    lg : "@media screen and (min-width: 1024px)",
    xl : "@media screen and (min-width: 1280px)",
    xxl : "@media screen and (min-width: 1920px)",
    xxxl : "@media screen and (min-width: 2560px)",
    xxxxl : "@media screen and (min-width: 3840px)",
}



let max_media_queries_lookup: Record<ScreenSize , string> = {
    all:"", // just to make the TS compiler shut up
    xs : "@media screen and (max-width: 319px)",
    sm : "@media screen and (max-width: 568px)",
    md : "@media screen and (max-width: 768px)",
    lg : "@media screen and (max-width: 1024px)",
    xl : "@media screen and (max-width: 1280px)",
    xxl : "@media screen and (max-width: 1920px)",
    xxxl : "@media screen and (max-width: 2560px)",
    xxxxl : "@media screen and (max-width: 3840px)",
}


// disables auto compilation on exit for hot module replacement in vite and similar tools to work
let passive_mode = false;



export function InvokeComplication(  ) {
    passive_mode = true;
    compile();
}


function compile(): void {

    let raw_style = "";

    const global_styles:SnippetsDump = SnippetsRegistry.dumpStyles();

    for( const screen_size in global_styles ) {

        const styles = global_styles[screen_size as ScreenSize];
        if ( ! styles )  continue;

        if ( screen_size === "all" ){
            raw_style += styles;
            continue;
        }

        let media_query: string;
        if (min_media_queries_lookup){
            media_query = max_media_queries_lookup[ screen_size as ScreenSize ];
        } else {
            media_query = min_media_queries_lookup[ screen_size as ScreenSize ];
        }

        raw_style += `${media_query} {\n${styles}}\n`;

    }

    if (process.argv[1]) {
        fs.writeFileSync(
            process.argv[1].slice(0, process.argv[1].length - 3) + ".css",
            raw_style,
            'utf8'
        );
    }

}



process.on('beforeExit', (code:number) => {

    if (passive_mode) return code;

    compile();

    return code;
});

