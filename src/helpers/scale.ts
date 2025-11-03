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
    md: 0,      // Fixed: medium should be base (0 steps)
    lg: +1,     // Fixed: large should be +1 step
    xl: +2,
    xxl: +3,
    xxxl: +4,
    xxxxl: +5,
};

export class Scale implements Scales {
    public readonly base: number;
    public readonly unit: string;
    public readonly scale: number;
    
    // Remove hardcoded initializations - they'll be calculated
    public readonly xxxxs: string;
    public readonly xxxs: string;
    public readonly xxs: string;
    public readonly xs: string;
    public readonly sm: string;
    public readonly md: string;
    public readonly lg: string;
    public readonly xl: string;
    public readonly xxl: string;
    public readonly xxxl: string;
    public readonly xxxxl: string;

    public readonly full: string = "100%";

    constructor(params: { base: number; unit: string; scale: number }) {
        this.base = params.base;
        this.unit = params.unit;
        this.scale = params.scale;

        // Initialize all properties
        this.xxxxs = this.calculateSize(scales_lookup.xxxxs);
        this.xxxs = this.calculateSize(scales_lookup.xxxs);
        this.xxs = this.calculateSize(scales_lookup.xxs);
        this.xs = this.calculateSize(scales_lookup.xs);
        this.sm = this.calculateSize(scales_lookup.sm);
        this.md = this.calculateSize(scales_lookup.md);
        this.lg = this.calculateSize(scales_lookup.lg);
        this.xl = this.calculateSize(scales_lookup.xl);
        this.xxl = this.calculateSize(scales_lookup.xxl);
        this.xxxl = this.calculateSize(scales_lookup.xxxl);
        this.xxxxl = this.calculateSize(scales_lookup.xxxxl);
    }

    private calculateSize(n: number): string {
        const calculatedValue = this.base * (this.scale ** n);
        return `${calculatedValue.toFixed(0)}${this.unit}`;
    }

    public size(n: number): string {
        return this.calculateSize(n);
    }
}

