export interface Scales {
    xxxxs: string;
    xxxs: string;
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
    xxxxl: string;
}

const scales_lookup: Record<keyof Scales, number> = {
    xxxxs: -5,
    xxxs: -4,
    xxs: -3,
    xs: -2,
    sm: -1,
    md: 0,
    lg: +1,
    xl: +2,
    xxl: +3,
    xxxl: +4,
    xxxxl: +5,
};

export class Scale implements Scales {
    public readonly base: number;
    public readonly unit: string;
    public readonly scale: number;
    
    // Scale properties
    public readonly xxxxs: string = "6.43px";
    public readonly xxxs: string = "7.72px";
    public readonly xxs: string = "9.26px";
    public readonly xs: string = "11.11px";
    public readonly sm: string = "13.33px";
    public readonly md: string = "16px";
    public readonly lg: string = "19.2px";
    public readonly xl: string = "23.04px";
    public readonly xxl: string = "27.65px";
    public readonly xxxl: string = "33.18px";
    public readonly xxxxl: string = "39.81px";

    constructor(params: { base: number; unit: string; scale: number }) {
        this.base = params.base;
        this.unit = params.unit;
        this.scale = params.scale;

        // Calculate all scale values
        for (const size in scales_lookup) {
            const key = size as keyof Scales;
            const multiplier = scales_lookup[key];
            (this as any)[key] = this.calculateSize(multiplier);
        }
    }

    private calculateSize(n: number): string {
        // Round to nearest multiple of base for consistent grid
        const calculatedValue = this.base * (this.scale ** n);
        const roundedValue = Math.round(calculatedValue / this.base) * this.base;
        return `${roundedValue}${this.unit}`;
    }

    public size(n: number): string {
        return this.calculateSize(n);
    }
}
