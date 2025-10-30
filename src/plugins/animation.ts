import {KeyFrame , ClawsPluginRegistry} from "../claws.js";

// animation: name duration timing-function delay iteration-count direction fill-mode play-state;


interface ClawsAnimationParams {
    keyframe: KeyFrame;
    time?: string;
    func?: string;
    delay?: string;
    repeat?: number|"infinite";
    dir?: "normal"|"reverse"|"alternate";
    fillMode?: "none"|"forward"|"backward"|"both";
    playing?: boolean; 
}


function ClawsAnimationPlugin( params:ClawsAnimationParams ) : Record<string , string> {

    let animation_style:Record<string , string> = {};
    
    // animation-name
    if ( !params.keyframe ){
        throw new Error( "animation${animation} is not optional. you have to fill it in" )
    }

    if ( ! (params.keyframe instanceof KeyFrame ) ){
        throw new Error( "animation${animation} has to be an instance of the Animation class" )
    }

    animation_style[ "animation-name" ] = params.keyframe.name;

    // animation-duration
    if ( params.time ){
        animation_style[ "animation-duration" ] = params.time;
    }

    // animation-timing-function
    if ( params.func ) {
        animation_style[ "animation-timing-function" ] = params.func;
    }

    // animation-delay
    if( params.delay ) {
        animation_style["animation-delay"] = params.delay;
    }

    // animation-iteration-count
    if( params.repeat ) {

        if ( typeof params.repeat === "number" && params.repeat > 0 ){
            animation_style["animation-iteration-count"] = params.repeat.toString();

        } else if( params.repeat === "infinite" ){
            animation_style["animation-iteration-count"] = "infinite";

        } else {
            throw new Error("animation${ repeat } has to be either a positive number of seconds or \"infinte\"");
        }

    }

    // animation-direction
    if( params.dir === "normal" || params.dir === "reverse" || params.dir === "alternate" ){
        animation_style["animation-direction"] = params.dir;

    } else if ( params.dir ){
        throw new Error("Incorrect value for animation${ dir } it has to be \"normal\" , \"reverse\" or \"alternate\" ");
    }

    // animation-fill-mode
    if( params.fillMode === "forward" ){
        animation_style["animation-fill-mode"] = "forwards";

    } else if ( params.fillMode === "backward" ){
        animation_style["animation-fill-mode"] = "backwards";

    } else if ( params.fillMode === "both" ){
        animation_style["animation-fill-mode"] = "both";

    } else if ( params.fillMode === "none" ){
        animation_style["animation-fill-mode"] = "none";

    } else if ( params.fillMode ){
        throw new Error("Incorrect value for animation${ fillMode } it has to be \"normal\" , \"reverse\" or \"alternate\" ");

    }

    // animation-play-state
    if ( typeof params.playing === "boolean" ){
        if ( params.playing ){
            animation_style["animation-play-state"] = "running";
        } else {
            animation_style["animation-play-state"] = "paused";
        }
    }

    return animation_style;

}

ClawsPluginRegistry.register( "animation" , ClawsAnimationPlugin );

