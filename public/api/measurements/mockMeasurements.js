export async function getMeasurements(sensorId) {
    const response = await fetch('../../public/api/measurements/' + sensorId + '.json');
    const data = await response.json();

    const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;

    const measurements = data.measurements.filter(m => {
        return {
            "date": new Date(m.timestamp).getTime() >= threeDaysAgo,
            "disp_mm": m.disp_mm
        };
    });

    return {
        sensorId: data.sensorId,
        measurements
    };
}