
export function convertTime(epoch: bigint) {
    
    try{
    const epochMilliseconds = Number(BigInt(epoch) / 1000000n);

    const date = new Date(epochMilliseconds);
    
    return date;
} catch (error){
    console.log(error);
    return null;
}    
}
