export async function getMeasurements(sensorId) {
    const response = await fetch('../../public/api/measurements/' + sensorId + '.json');
    const data = await response.json();

    const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;

    const measurements = data.measurements.filter(m => {
        return new Date(m.timestamp).getTime() <= threeDaysAgo;
    });

    return {
        sensorId: data.sensorId,
        measurements
    };
}