export function parseTimestamp(timestamp: string) {
    const [datePart, timePart] = timestamp.split("T");
    const [time, nano] = timePart.replace("Z", "").split(".");
    
    const date = new Date(`${datePart}T${time}Z`);
    const milliseconds = date.getTime();
    const nanoseconds = parseInt(nano.padEnd(9, "0"));
    
    return { milliseconds, nanoseconds };
}

export function diffNano(start: string, end: string) {
    const startTime = parseTimestamp(start);
    const endTime = parseTimestamp(end);

    const diffMs = endTime.milliseconds - startTime.milliseconds;
    const diffNs = endTime.nanoseconds - startTime.nanoseconds;

    const totalDiffNs = diffMs * 1_000_000 + diffNs;
    return totalDiffNs;
}