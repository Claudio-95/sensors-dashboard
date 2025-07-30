import sensorsData from '../../public/data/sensors.json';
import { getMeasurements } from '../../public/api/measurements/mockMeasurements';

export async function fetchSensorsWithLastValue() {
    const result = []

    for (const sensor of sensorsData) {
        const data = await getMeasurements(sensor.id);
        const last = data.measurements.at(-1);
        result.push({
            ...sensor,
            lastValue: last?.disp_mm ?? null
        })
    }

    return result;
}

export function sortSensorsBy(sensors, field) {
    return [...sensors].sort((a, b) => {
        const valA = a[field];
        const valB = b[field];

        if (typeof valA === 'string' && typeof valB === 'string') {
            return valA.localeCompare(valB);
        } else if (typeof valA !== typeof valB) {
            alert('Error sorting values: check your data.');
            return;
        }

        return valA > valB ? 1 : valA < valB ? -1 : 0;
    });
}