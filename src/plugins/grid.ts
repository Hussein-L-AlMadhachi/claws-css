import { ClawsPluginRegistry } from "../claws.js";

interface GridParams {
    cols?: number | string[];
    rows?: number | string[];

    gap?: string;
    gap_x?: string;
    gap_y?: string;
    
    justifyItems?: "start" | "end" | "center" | "stretch";
    alignItems?: "start" | "end" | "center" | "stretch" | "baseline";
    justifyContent?: "start" | "end" | "center" | "stretch" | "between" | "around" | "evenly";
    alignContent?: "start" | "end" | "center" | "stretch" | "between" | "around" | "evenly";

    auto?: { flow?:"row"|"col"|"dense"|"row-dense"|"col-dense", rows?:string , cols?:string }
}

type StylesExport = Record<string, string>;

// Lookup maps
const JUSTIFY_ITEMS_MAP: Record<string, string> = {
    start: "start",
    end: "end",
    center: "center",
    stretch: "stretch"
};

const ALIGN_ITEMS_MAP: Record<string, string> = {
    start: "start",
    end: "end",
    center: "center",
    stretch: "stretch",
    baseline: "baseline"
};

const JUSTIFY_CONTENT_MAP: Record<string, string> = {
    start: "start",
    end: "end",
    center: "center",
    stretch: "stretch",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly"
};

const ALIGN_CONTENT_MAP: Record<string, string> = {
    start: "start",
    end: "end",
    center: "center",
    stretch: "stretch",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly"
};

const AUTO_FLOW_MAP: Record<string, string> = {
    row: "row",
    col: "column",
    dense: "dense",
    "row-dense": "row dense",
    "col-dense": "column dense"
};

function ClawsGridPlugin({
    cols,
    rows,
    gap,
    gap_x,
    gap_y,
    justifyItems,
    alignItems,
    justifyContent,
    alignContent,
    auto,
}: GridParams): StylesExport {
    const result_styles: StylesExport = { display: "grid" };

    // Handle grid-template-columns
    if (cols !== undefined) {
        if (typeof cols === "number") {
            // Number = repeat(n, 1fr)
            result_styles["grid-template-columns"] = `repeat(${cols}, 1fr)`;
        } else if ( cols instanceof Array ) {
            
            // check for type errors (for vanilla JS users)
            for( const col of cols ){
                if ( typeof col !== "string" ){
                    throw new Error("Grid Column template must be an array of strings or a number of columns");
                }
            }

            result_styles["grid-template-columns"] = cols.join(" ");
        } else {
            throw new Error("Grid Column template must be an array of strings or a number of columns");
        }
    }


    // Handle grid-template-rows
    if (rows !== undefined) {
        if (typeof rows === "number") {
            result_styles["grid-template-rows"] = `repeat(${rows}, 1fr)`;
        } else if ( rows instanceof Array ) {
            
            // check for type errors (for vanilla JS users)
            for( const row of rows ){
                if ( typeof row !== "string" ){
                    throw new Error("Grid Rows template must be an array of strings or a number of rows");
                }
            }

            result_styles["grid-template-rows"] = rows.join(" ");
        } else {
            throw new Error("Grid Rows template must be an array of strings or a number of rows")
        }
    }


    // Handle gap properties
    if (gap !== undefined) {
        result_styles["gap"] = gap;
    } else {
        // If gap is not set, check for individual gaps
        if (gap_x !== undefined) {
            result_styles["column-gap"] = gap_x;
        }
        if (gap_y !== undefined) {
            result_styles["row-gap"] = gap_y;
        }
    }


    // Handle justify-items
    if (justifyItems !== undefined) {
        if (justifyItems in JUSTIFY_ITEMS_MAP) {
            result_styles["justify-items"] = JUSTIFY_ITEMS_MAP[justifyItems]!;
        } else {
            throw new Error(
                `Invalid value for grid{justifyItems: "${justifyItems}"}. ` +
                `Valid options: ${Object.keys(JUSTIFY_ITEMS_MAP).join(", ")}`
            );
        }
    }


    // Handle align-items
    if (alignItems !== undefined) {
        if (alignItems in ALIGN_ITEMS_MAP) {
            result_styles["align-items"] = ALIGN_ITEMS_MAP[alignItems]!;
        } else {
            throw new Error(
                `Invalid value for grid{alignItems: "${alignItems}"}. ` +
                `Valid options: ${Object.keys(ALIGN_ITEMS_MAP).join(", ")}`
            );
        }
    }


    // Handle justify-content
    if (justifyContent !== undefined) {
        if (justifyContent in JUSTIFY_CONTENT_MAP) {
            result_styles["justify-content"] = JUSTIFY_CONTENT_MAP[justifyContent]!;
        } else {
            throw new Error(
                `Invalid value for grid{justifyContent: "${justifyContent}"}. ` +
                `Valid options: ${Object.keys(JUSTIFY_CONTENT_MAP).join(", ")}`
            );
        }
    }


    // Handle align-content
    if (alignContent !== undefined) {
        if (alignContent in ALIGN_CONTENT_MAP) {
            result_styles["align-content"] = ALIGN_CONTENT_MAP[alignContent]!;
        } else {
            throw new Error(
                `Invalid value for grid{alignContent: "${alignContent}"}. ` +
                `Valid options: ${Object.keys(ALIGN_CONTENT_MAP).join(", ")}`
            );
        }
    }


    // Handle grid-auto-flow
    if (auto?.flow !== undefined) {
        if (auto?.flow in AUTO_FLOW_MAP) {
            result_styles["grid-auto-flow"] = AUTO_FLOW_MAP[auto?.flow]!;
        } else {
            throw new Error(
                `Invalid value for grid{autoFlow: "${auto?.flow}"}. ` +
                `Valid options: ${Object.keys(AUTO_FLOW_MAP).join(", ")}`
            );
        }
    }


    // Handle grid-auto-rows
    if (auto?.rows !== undefined) {
        result_styles["grid-auto-rows"] = auto?.rows;
    }


    // Handle grid-auto-columns
    if (auto?.cols !== undefined) {
        result_styles["grid-auto-columns"] = auto?.cols;
    }

    return result_styles;
}

ClawsPluginRegistry.register("grid", ClawsGridPlugin);

export { ClawsGridPlugin, type GridParams };









interface GridItemParams {
    col?: number[];
    row?: number[];
    justifySelf?: "auto" | "start" | "end" | "center" | "stretch";
    alignSelf?: "auto" | "start" | "end" | "center" | "stretch" | "baseline";
}


// Lookup maps
const JUSTIFY_SELF_MAP: Record<string, string> = {
    auto: "auto",
    start: "start",
    end: "end",
    center: "center",
    stretch: "stretch"
};

const ALIGN_SELF_MAP: Record<string, string> = {
    auto: "auto",
    start: "start",
    end: "end",
    center: "center",
    stretch: "stretch",
    baseline: "baseline"
};

function ClawsGridItemPlugin({
    col,
    row,
    justifySelf,
    alignSelf
}: GridItemParams): StylesExport {
    const result_styles: StylesExport = {};


    // handling row and column placement
    if ( col && row ){

        // using grid-area shortcut to generate smaller css when possible
        result_styles["grid-area"] = `${ row[0] } / ${ col[0] } / ${ row[1] } / ${ col[1] }`;    
    
    } else if (col !== undefined) {

        // Handle grid-column (shorthand)
        result_styles["grid-column"] = `${col[0]} / ${col[1]}`;
    
    } else if (row !== undefined) {

        // Handle grid-row (shorthand)
        result_styles["grid-row"] = `${row[0]} / ${row[1]}`;

    }


    // handle justify & align self
    
    if ( justifySelf && justifySelf === alignSelf ) {
        // use place-self to optimize for smaller CSS footprint when possible

        result_styles["place-self"] = justifySelf;

    } else {
 
        // Handle justify-self
        if (justifySelf !== undefined) {
            
            if (justifySelf in JUSTIFY_SELF_MAP) {
                result_styles["justify-self"] = JUSTIFY_SELF_MAP[justifySelf]!;
            } else {
                throw new Error(
                    `Invalid value for grid-item{justifySelf: "${justifySelf}"}. ` +
                    `Valid options: ${Object.keys(JUSTIFY_SELF_MAP).join(", ")}`
                );
            }

        }
        
        // Handle align-self
        if (alignSelf !== undefined) {

            if (alignSelf in ALIGN_SELF_MAP) {
                result_styles["align-self"] = ALIGN_SELF_MAP[alignSelf]!;
            } else {
                throw new Error(
                    `Invalid value for grid-item{alignSelf: "${alignSelf}"}. ` +
                    `Valid options: ${Object.keys(ALIGN_SELF_MAP).join(", ")}`
                );
            }

        }
    }


    return result_styles;
}

ClawsPluginRegistry.register("grid-item", ClawsGridItemPlugin);

export { ClawsGridItemPlugin, type GridItemParams };