import { Scale } from "../src/claws.js";



const fontSize = new Scale({ base: 16, unit: "px", scale: 1.2 });

console.log(fontSize.xxxxs);  // "6px"  (16 * 1.2^-5)
console.log(fontSize.xxxs);  // "8px"  (16 * 1.2^-4)
console.log(fontSize.xxs);  // "9px"  (16 * 1.2^-3)
console.log(fontSize.xs);  // "11px"  (16 * 1.2^-2)
console.log(fontSize.sm);  // "13px"  (16 * 1.2^-1)  
console.log(fontSize.md);  // "16px"  (16 * 1.2^0)
console.log(fontSize.lg);  // "19px"  (16 * 1.2^1)

console.log(fontSize.xl);  // "23.04px"  (16 * 1.2^2)
console.log(fontSize.xxl);  // "28px"  (16 * 1.2^3)
console.log(fontSize.xxxl);  // "33px"  (16 * 1.2^4)
console.log(fontSize.xxxxl);  // "40px"  (16 * 1.2^5)

