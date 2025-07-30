import Plotly from 'plotly.js-dist-min';
import { getMeasurements } from '../../public/api/measurements/mockMeasurements.js';

import sensors from '../../public/data/sensors.json';

export async function drawChart(container, sensorId) {
    const sensor = sensors.find(s => s.id === sensorId);
    const { measurements } = await getMeasurements(sensorId);

    const timestamp_X = measurements.map(m => m.timestamp);
    const disp_mm_Y = measurements.map(m => m.disp_mm);

    const thresholdLine = {
        timestamp_X,
        disp_mm_Y: Array(timestamp_X.length).fill(sensor.threshold),
        mode: 'lines',
        name: 'Threshold',
        line: { dash: 'dot', color: 'red'}
    };

    const dataLine = {
        timestamp_X,
        disp_mm_Y,
        mode: 'lines+markers',
        name: 'Measurements',
        line: { color: 'blue' },
        marker: {
            color: disp_mm_Y.map(val => val > sensor.threshold ? 'red' : 'blue'),
            size: 6
        }
    }

    Plotly.newPlot(container, [dataLine, thresholdLine], {
        margin: { t: 20}
    }, { responsive: true })
}