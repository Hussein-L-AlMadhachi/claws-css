export interface Scales {
    xxxxs:string;
    xxxs:string;
    xxs:string;
    xs:string;
    sm:string;
    md:string;
    lg:string;
    xl:string;
    xxl:string;
    xxxl:string;
    xxxxl:string;
}


const scales_lookup : Record<string, number> = {
    xxxxs:-5,
    xxxs:-4,
    xxs:-3,
    xs:-2,
    sm:-1,
    md:0,
    lg:+1,
    xl:+2,
    xxl:+3,
    xxxl:+4,
    xxxxl:+5,
}



export class Scale {

    base:number;
    unit:string;
    scale:number;
    [key: string]: any;

    constructor(params:{base:number , unit:string , scale:number}) {
        this.base=params.base;
        this.unit=params.unit;
        this.scale=params.scale;

        for( const size in scales_lookup ) {
            this[size] = this.size(scales_lookup[size]!);
        }
    }

    public size( n:number ):string {
        const calculatedValue = Math.ceil( this.base*(this.scale ** n) / 4 ) * 4; //rounded to the closest four
        return `${ calculatedValue }${this.unit}`
    }

}


