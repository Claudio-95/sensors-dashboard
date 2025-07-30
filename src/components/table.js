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

export function sortSensorsByName(sensors) {
    return [...sensors].sort((a, b) =>
        a.name.localeCompare(b.name)
    );
}