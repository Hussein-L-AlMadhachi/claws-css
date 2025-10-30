
export function toBase32(num:number) :string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const buffer = Buffer.alloc(8);
    buffer.writeBigUInt64BE(BigInt(num), 0);
    
    let result:string = '';
    let bits:number = 0;
    let bitsCount:number = 0;
    
    for (const byte of buffer) {
        bits = (bits << 8) | byte;
        bitsCount += 8;
        
        while (bitsCount >= 5) {
            const value = (bits >> (bitsCount - 5)) & 0x1F;
            result = alphabet[value] + result;
            bitsCount -= 5;
        }
    }
    
    if (bitsCount > 0) {
        const value = (bits << (5 - bitsCount)) & 0x1F;
        result = alphabet[value] + result;
    }
    
    // Remove leading 'A's (which represent 0)
    return result.replace(/^A+/, '') || 'A';
}
