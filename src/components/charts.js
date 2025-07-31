import Plotly from 'plotly.js-dist-min';
import { getMeasurements } from '../../public/api/measurements/mockMeasurements.js';

import sensors from '../../public/data/sensors.json';

export async function drawChart(container, sensorId) {
    const sensor = sensors.find(s => s.id === sensorId);
    const { measurements } = await getMeasurements(sensorId);

    const timestamp_X = measurements.map(m => m.timestamp);
    timestamp_X.sort((a, b) => new Date(a) - new Date(b));
    const disp_mm_Y = measurements.map(m => m.disp_mm);

    const thresholdLine = {
        x: timestamp_X,
        y: Array(timestamp_X.length).fill(sensor.threshold),
        mode: 'lines',
        name: 'Threshold',
        line: { dash: 'line', color: 'red'}
    };

    const dataLine = {
        x: timestamp_X,
        y: disp_mm_Y,
        mode: 'markers',
        name: 'disp_mm',
        marker: {
            color: disp_mm_Y.map(val => val > sensor.threshold ? 'red' : 'blue'),
            size: 6
        }
    }

    await Plotly.newPlot(container, [dataLine, thresholdLine], {
        margin: { t: 20}
    }, { responsive: true });
}