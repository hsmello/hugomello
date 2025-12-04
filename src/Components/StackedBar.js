// src/Components/StackedBar.js
import { ResponsiveBar } from '@nivo/bar';

const StackedBar = ({
    data,
    keys,
    indexBy,
    axisBottomLegend,
    axisLeftLegend,
    colors,
    numberOfBins = 10,
    padding
}) => {

    // --- convert array of numbers → histogram bins
    function getHistogramData(values, numberOfBins = 10) {
        const min = Math.min(...values);
        const max = Math.max(...values);
        const binWidth = (max - min) / numberOfBins;
        const bins = [];

        for (let i = 0; i < numberOfBins; i++) {
            const start = min + i * binWidth;
            const end = start + binWidth;
            const count = values.filter(v => v >= start && v < end).length;
            bins.push({
                bin: `${start.toFixed(1)}–${end.toFixed(1)}`,
                frequency: count,
            });
        }

        return bins;
    }

    // --- if data is numeric array, make a histogram
    const processedData = Array.isArray(data) && typeof data[0] === "number"
        ? getHistogramData(data, numberOfBins)
        : data;

    // --- auto-set default keys and index if histogram
    const usedKeys = typeof processedData[0] === "object" && processedData[0].frequency
        ? ["frequency"]
        : keys;
    const usedIndexBy = processedData[0]?.bin ? "bin" : indexBy;

     // --- conditionally render left axis
    const leftAxis = axisLeftLegend !== undefined && axisLeftLegend !== null
        ? {
            legend: axisLeftLegend || (processedData[0]?.bin ? "Frequency" : ""),
            legendOffset: -40,
        }
        : null;

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ResponsiveBar
                data={processedData}
                keys={usedKeys}
                indexBy={usedIndexBy}
                borderWidth={5}
                groupMode="grouped"
                axisBottom={{
                    legend: axisBottomLegend || (processedData[0]?.bin ? "Value Range" : ""),
                    legendOffset: 40,
                }}
                axisLeft={leftAxis}
                margin={{ top: 30, right: 100, bottom: 50, left: 30 }}
                padding={padding}
                innerPadding={5}
                colors={colors || { scheme: 'paired' }}
                enableGridY={false}
                labelSkipWidth={12}
                labelSkipHeight={12}
                label={d => new Intl.NumberFormat().format(d.value)}
                theme={{
                    textColor: 'var(--textColor)',
                    fontFamily: 'inherit',
                    tooltip: {
                        container: {
                            background: '#1b2537',
                            color: '#fff',
                            fontSize: 13,
                            borderRadius: 6,
                            boxShadow: '0 0 6px rgba(0, 0, 0, 0.3)',
                            fontFamily: 'inherit',
                        },
                    },
                    axis: {
                        ticks: { text: { fill: 'var(--textColor)', fontFamily: 'inherit' } },
                        legend: { text: { fill: 'var(--textColor)', fontFamily: 'inherit' } },
                    },
                    labels: { text: { fill: 'white', fontFamily: 'inherit' } },
                }}
            />
        </div>
    );
};

export default StackedBar;
