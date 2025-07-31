import Plotly from 'plotly.js-dist-min';
import { getMeasurements } from '../../public/api/measurements/mockMeasurements.js';

import sensors from '../../public/data/sensors.json';

export async function drawChart(container, sensorId) {
    const sensor = sensors.find(s => s.id === sensorId);
    const { measurements } = await getMeasurements(sensorId);

    const timestamp_X = measurements.map(m => m.timestamp);
    timestamp_X.sort((a, b) => new Date(a) - new Date(b));

    const belowThreshold = measurements.filter(m => m.disp_mm <= sensor.threshold);
    const aboveThreshold = measurements.filter(m => m.disp_mm > sensor.threshold);

    const thresholdLine = {
        x: timestamp_X,
        y: Array(timestamp_X.length).fill(sensor.threshold),
        mode: 'lines',
        name: 'Threshold',
        line: { dash: 'line', color: 'red'}
    };

    const dataBelow = {
        x: belowThreshold.map(m => m.timestamp),
        y: belowThreshold.map(m => m.disp_mm),
        mode: 'markers',
        name: 'disp_mm',
        marker: {
            color: 'blue',
            size: 6
        },
        type: 'scatter'
    };

    const dataAbove = {
        x: aboveThreshold.map(m => m.timestamp),
        y: aboveThreshold.map(m => m.disp_mm),
        mode: 'markers',
        name: 'disp_mm',
        marker: {
            color: 'red',
            size: 8
        },
        type: 'scatter'
    };

    await Plotly.newPlot(container, [dataBelow, dataAbove, thresholdLine], {
        margin: { t: 20},
        xaxis: {
            tickformat: "%B %d, %H:%M",
            automargin: true
        }
    }, { responsive: true });
}