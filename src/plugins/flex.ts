import { ClawsPluginRegistry } from "../claws.js";





// Lookup maps

const FLEX_ITEMS_MAP: Record<string, string> = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    stretch: "stretch",
    baseline: "baseline"
};

const FLEX_CONTENT_MAP: Record<string, string> = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly"
};



// Lookup map for align-self
const ITEMS_ALIGN_SELF_MAP: Record<string, string> = {
    auto: "auto",
    start: "flex-start",
    end: "flex-end",
    center: "center",
    baseline: "baseline",
    stretch: "stretch"
};


// Lookup map for wrap
const FLEX_WRAP_MAP: Record<string, string> = {
    reverse: "wrap-reverse",
    nowrap: "nowrap",
    wrap: "wrap",
};



// types
type StylesExport = Record<string , string>

interface FlexParams {
    wrap?: "wrap" | "reverse" | "nowrap"|null;
    vertical?: boolean;
    justify?: "center"|"start"|"end"|"between"|"around"|"evenly";
    items?: "center"|"start"|"end"|"baseline"|"stretch";
    content?: "center"|"start"|"end"|"between"|"around"|"evenly"|undefined;
    reverse?: boolean;
}

export interface FlexItemParams {
    grow?: number;
    shrink?: number;
    basis?: string | number;
    align?: "auto" | "start" | "end" | "center" | "baseline" | "stretch";
    order?: number;
}





function ClawsflexPlugin({
    wrap=null,
    vertical=false,
    justify="center",
    items="center",
    content,
    reverse=false 
}:FlexParams) : StylesExport {

    let result_styles:StylesExport = { display:"flex" };


    // flex-direction
    if ( vertical === true ) {
        result_styles[ "flex-direction" ] = "column";
    }

    // reverse flex-direction if enabled
    if ( reverse ) {
        result_styles[ "flex-direction" ] = `${result_styles[ "flex-direction" ]}-reverse`;
    }
    
    // wrap
    if ( wrap !== null ) {
        const wrap_style = FLEX_WRAP_MAP[wrap];
        if ( wrap_style === undefined ){  
            throw new Error(
                `Invalid value for flex{wrap: "${wrap}"}. ` +
                `Valid options: ${Object.keys(FLEX_WRAP_MAP).join(", ")}`
            );
        }
        result_styles[ "flex-wrap" ] = wrap_style;
    }


    // justify-content
    const justify_style = FLEX_CONTENT_MAP[justify];
    if ( justify_style === undefined ){  
        throw new Error(
            `Invalid value for flex{justify: "${justify}"}. ` +
            `Valid options: ${Object.keys(FLEX_CONTENT_MAP).join(", ")}`
        );
    }
    result_styles["justify-content"] = justify_style;

    // align-content
    if (content) {
        const content_style = FLEX_CONTENT_MAP[ content ];
        
        if ( content_style === undefined ){  
            throw new Error(
                `Invalid value for flex{content: "${content}"}. ` +
                `Valid options: ${Object.keys(FLEX_CONTENT_MAP).join(", ")}`
            );
        }

        result_styles["align-content"] = content_style;
    }

    // align-items
    const items_style = FLEX_ITEMS_MAP[items];
    if ( items_style === undefined ){  
        throw new Error(
            `Invalid value for flex{items: "${items}"}. ` +
            `Valid options: ${Object.keys(FLEX_ITEMS_MAP).join(", ")}`
        );
    }
    result_styles["align-items"] = items_style;


    return result_styles;
}





function ClawsFlexItemPlugin({
    grow,
    shrink,
    basis,
    align,
    order
}: FlexItemParams): StylesExport {
    const result_styles: StylesExport = {};
    
    // Handle flex-grow
    if (grow) {
        result_styles["flex-grow"] = String(grow);
    }
    
    // Handle flex-shrink
    if (shrink) {
        result_styles["flex-shrink"] = String(shrink);
    }
    
    // Handle flex-basis
    if (basis) {
        // If it's a number, assume pixels
        result_styles["flex-basis"] = typeof basis === "number" 
        ? `${basis}px` 
        : basis;
    }
    
    // Handle align-self
    if (align) {
        if (align in ITEMS_ALIGN_SELF_MAP) {
            result_styles["align-self"] = ITEMS_ALIGN_SELF_MAP[align]!;
        } else {
            throw new Error(
                `Invalid value for flex-item{align: "${align}"}. ` +
                `Valid options: ${Object.keys(ITEMS_ALIGN_SELF_MAP).join(", ")}`
            );
        }
    }
    
    // Handle order
    if (order) {
        result_styles["order"] = String(order);
    }
    
    return result_styles;
}





// registering all plugins and assign them virtual CSS properties
ClawsPluginRegistry.register("flex", ClawsflexPlugin );
ClawsPluginRegistry.register("flex-item", ClawsFlexItemPlugin);

