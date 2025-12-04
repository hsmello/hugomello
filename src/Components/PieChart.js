import { ResponsivePie } from '@nivo/pie'

const MyPie = ({ data }) => (
    <ResponsivePie /* or Pie for fixed dimensions */
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.6}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        valueFormat={value => value.toLocaleString('en-US')}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#eee"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
        /*legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
                symbolShape: 'circle',
                itemTextColor: '#eee',
            }
        ]}*/
        theme={{
        tooltip: {
            container: {
                background: '#1b2537',   // tooltip background color
                color: '#fff',           // text color
                fontSize: 13,
                borderRadius: 6,
                boxShadow: '0 0 6px rgba(0, 0, 0, 0.3)',
            },
        },
    }}
    />
)

export default MyPie;