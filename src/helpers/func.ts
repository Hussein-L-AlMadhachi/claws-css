export function calc( value:string ){
    return `calc(${value})`;
}



export function cubicBezier( x1:number,x2:number,y1:number,y2:number ){
    return `cubic-bezier(${x1}, ${x2}, ${y1}, ${y2})`;
}