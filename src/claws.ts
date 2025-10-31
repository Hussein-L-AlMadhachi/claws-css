export { Component } from "./frontend/component.js";
export { KeyFrame } from "./frontend/keyframe.js";

export {
    ClawsPluginRegistry, 
    type ClawsPlugin , 
    type ClawsPluginsMap,
} from "./frontend/plugin.js";

// compiler.ts genrates CSS before the process exits unless InvokeComplication is called
export {
    EnableDesktopFirst,
    InvokeComplication
} from "./backend/compiler.js";

export {s ,type StylesTemplate } from "./frontend/s-template.js";

export {
    SnippetsRegistry
} from "./backend/snippets.js";

export { Scale } from "./helpers/scale.js";
export { calc } from "./helpers/func.js";

// emabling core plugings
import "./plugins/shortcuts.js";
import "./plugins/transition.js";
import "./plugins/animation.js";
import "./plugins/flex.js";
import "./plugins/grid.js";
