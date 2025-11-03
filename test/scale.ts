import { Scale } from "../src/claws.js";



const fontSize = new Scale({ base: 16, unit: "px", scale: 1.1 });

console.log(fontSize.xxxxs);  // "11.11px"  (16 * 1.2^-2)
console.log(fontSize.xxxs);  // "11.11px"  (16 * 1.2^-2)
console.log(fontSize.xxs);  // "11.11px"  (16 * 1.2^-2)
console.log(fontSize.xs);  // "11.11px"  (16 * 1.2^-2)
console.log(fontSize.sm);  // "13.33px"  (16 * 1.2^-1)  
console.log(fontSize.md);  // "16.00px"  (16 * 1.2^0)
console.log(fontSize.lg);  // "19.20px"  (16 * 1.2^1)

console.log(fontSize.xl);  // "23.04px"  (16 * 1.2^2)
console.log(fontSize.xxl);  // "23.04px"  (16 * 1.2^2)
console.log(fontSize.xxxl);  // "23.04px"  (16 * 1.2^2)
console.log(fontSize.xxxxl);  // "23.04px"  (16 * 1.2^2)

