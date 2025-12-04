import { ResponsiveLine } from '@nivo/line'

const LineChartTime = ({ data, enablePoints=true, xScale, axisBottom=true, legends = [] }) => (
    <ResponsiveLine 
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        xScale={xScale}
        axisBottom={axisBottom}
        axisLeft={{ 
            legend: '', 
            legendOffset: -50, 
            format: value => value.toLocaleString('en-US') }}
        enableGridX={false}
        enableGridY={false}
        enablePoints={enablePoints}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'seriesColor' }}
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={legends}
        
        theme={{
            textColor: 'var(--textColor)', // all text inherits this color
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
            ticks: {
                text: { fill: 'var(--textColor)', fontFamily: 'inherit' },
            },
            legend: {
                text: { fill: 'var(--textColor)', fontFamily: 'inherit' },
            },
            },
            legends: {
                text: { fill: 'var(--textColor)', fontFamily: 'inherit' },
            },
            }}
    />
)

export default LineChartTime;