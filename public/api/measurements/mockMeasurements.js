export async function getMeasurements(sensorId) {
    const base = Date.now() - 3 * 24 * 60 * 60 * 1000;    // 3 days ago
    const measurements = Array.from({ length: 100}, (_, i) => {
        const timestamp = new Date(base + i * 30 * 60 * 1000).toISOString();
        const disp_mm = +(Math.random() * 5).toFixed(2)

        return {timestamp, disp_mm};
    });

    return {sensorId, measurements};
}