import { ClawsPluginRegistry } from "../claws.js";



// height
function ClawsHeightShortcut( input:string ): Record<string,string> {
    return {"height":input.toString()};
}
function ClawsMaxHeightShortcut( input:string ): Record<string,string> {
    return {"max-height":input.toString()};
}
function ClawsMinHeightShortcut( input:string ): Record<string,string> {
    return {"min-height":input.toString()};
}



// width
function ClawsWidthShortcut( input:string ): Record<string,string> {
    return {"width":input.toString()};
}
function ClawsMaxWidthShortcut( input:string ): Record<string,string> {
    return {"max-width":input.toString()};
}
function ClawsMinWidthShortcut( input:string ): Record<string,string> {
    return {"min-width":input.toString()};
}



// radius
function ClawsRadiusShortcut( input:string ): Record<string,string> {
    return {"border-radius":input.toString()};
}
function ClawsTopLeftShortcut( input:string ): Record<string,string> {
    return {"border-top-left-radius":input.toString()};
}
function ClawsTopRightShortcut( input:string ): Record<string,string> {
    return {"border-top-right-radius":input.toString()};
}
function ClawsBottomRightShortcut( input:string ): Record<string,string> {
    return {"border-bottom-right-radius":input.toString()};
}
function ClawsBottomLeftShortcut( input:string ): Record<string,string> {
    return {"border-bottom-left-radius":input.toString()};
}
function ClawsTopShortcut( input:string ):  Record<string,string> {
    return {"border-top-left-radius":input.toString() , "border-top-right-radius":input.toString()};
}
function ClawsRightShortcut( input:string ): Record<string,string> {
    return {"border-bottom-right-radius":input.toString() , "border-top-right-radius":input.toString()};
}
function ClawsBottomShortcut( input:string ): Record<string,string> {
    return {"border-bottom-right-radius":input.toString() , "border-bottom-left-radius":input.toString()};
}
function ClawsLeftShortcut( input:string ): Record<string,string> {
    return {"border-top-left-radius":input.toString() , "border-bottom-left-radius":input.toString()};
}



// color
function ClawsForegroundColorShortcut( input:string ): Record<string,string> {
    return {"color":input.toString()};
}
function ClawsBackgroundColorShortcut( input:string ): Record<string,string> {
    return {"background-color":input.toString()};
}
function ClawsFillColorShortcut( input:string ): Record<string,string> {
    return {"fill":input.toString()};
}



// text size
function ClawsTextSizeShortcut( input:string ): Record<string,string> {
    return {"font-size":input.toString()};
}



// margins
function ClawsMarginShortcut( input:string ): Record<string,string> {
    return {"margin":input.toString()};
}
function ClawsMarginTopShortcut( input:string ): Record<string,string> {
    return {"margin-top":input.toString()};
}
function ClawsMarginLeftShortcut( input:string ): Record<string,string> {
    return {"margin-left":input.toString()};
}
function ClawsMarginBottomShortcut( input:string ): Record<string,string> {
    return {"margin-bottom":input.toString()};
}
function ClawsMarginRightShortcut( input:string ): Record<string,string> {
    return {"margin-right":input.toString()};
}
function ClawsMarginYShortcut( input:string ): Record<string,string> {
    return {"margin-bottom":input.toString() , "margin-top":input.toString()};
}
function ClawsMarginXShortcut( input:string ): Record<string,string> {
    return {"margin-right":input.toString() , "margin-left":input.toString()};
}



// padding
function ClawsPaddingShortcut( input:string ): Record<string,string> {
    return {"padding":input.toString()};
}
function ClawsPaddingTopShortcut( input:string ): Record<string,string> {
    return {"padding-top":input.toString()};
}
function ClawsPaddingLeftShortcut( input:string ): Record<string,string> {
    return {"padding-left":input.toString()};
}
function ClawsPaddingBottomShortcut( input:string ): Record<string,string> {
    return {"padding-bottom":input.toString()};
}
function ClawsPaddingRightShortcut( input:string ): Record<string,string> {
    return {"padding-right":input.toString()};
}
function ClawsPaddingYShortcut( input:string ): Record<string,string> {
    return {"padding-bottom":input.toString() , "padding-top":input.toString()};
}
function ClawsPaddingXShortcut( input:string ): Record<string,string> {
    return {"padding-right":input.toString() , "padding-left":input.toString()};
}



// registering all plugins and assigning them virtual CSS properties
ClawsPluginRegistry.register("h", ClawsHeightShortcut );
ClawsPluginRegistry.register("max-h", ClawsMaxHeightShortcut );
ClawsPluginRegistry.register("min-h", ClawsMinHeightShortcut );

ClawsPluginRegistry.register("w", ClawsWidthShortcut );
ClawsPluginRegistry.register("max-w", ClawsMaxWidthShortcut );
ClawsPluginRegistry.register("min-w", ClawsMinWidthShortcut );

ClawsPluginRegistry.register("radius", ClawsRadiusShortcut );

ClawsPluginRegistry.register("radius-tl", ClawsTopLeftShortcut );
ClawsPluginRegistry.register("radius-tr", ClawsTopRightShortcut );
ClawsPluginRegistry.register("radius-br", ClawsBottomRightShortcut );
ClawsPluginRegistry.register("radius-bl", ClawsBottomLeftShortcut );

ClawsPluginRegistry.register("radius-t", ClawsTopShortcut );
ClawsPluginRegistry.register("radius-r", ClawsRightShortcut );
ClawsPluginRegistry.register("radius-b", ClawsBottomShortcut );
ClawsPluginRegistry.register("radius-l", ClawsLeftShortcut );

ClawsPluginRegistry.register("fg", ClawsForegroundColorShortcut );
ClawsPluginRegistry.register("bg", ClawsBackgroundColorShortcut );
ClawsPluginRegistry.register("fill", ClawsFillColorShortcut );

ClawsPluginRegistry.register("text", ClawsTextSizeShortcut );

ClawsPluginRegistry.register("m", ClawsMarginShortcut );
ClawsPluginRegistry.register("mt", ClawsMarginTopShortcut );
ClawsPluginRegistry.register("ml", ClawsMarginLeftShortcut );
ClawsPluginRegistry.register("mb", ClawsMarginBottomShortcut );
ClawsPluginRegistry.register("mr", ClawsMarginRightShortcut );
ClawsPluginRegistry.register("my", ClawsMarginYShortcut );
ClawsPluginRegistry.register("mx", ClawsMarginXShortcut );

ClawsPluginRegistry.register("p", ClawsPaddingShortcut );
ClawsPluginRegistry.register("pt", ClawsPaddingTopShortcut );
ClawsPluginRegistry.register("pl", ClawsPaddingLeftShortcut );
ClawsPluginRegistry.register("pb", ClawsPaddingBottomShortcut );
ClawsPluginRegistry.register("pr", ClawsPaddingRightShortcut );
ClawsPluginRegistry.register("py", ClawsPaddingYShortcut );
ClawsPluginRegistry.register("px", ClawsPaddingXShortcut );


