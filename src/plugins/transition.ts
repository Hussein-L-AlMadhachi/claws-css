import { ClawsPluginRegistry } from "../claws.js";



function ClawsTransitionPlugin(config: {
  props?: string,
  duration?: string,
  easing?: string
}) : Record<string , string> {

    const props = config.props || "all";
    const duration = config.duration || "200ms";
    const easing = config.easing || "ease";
    
    return {
        "transition": `${props} ${duration} ${easing}`
    };
}



ClawsPluginRegistry.register("transition", ClawsTransitionPlugin );


