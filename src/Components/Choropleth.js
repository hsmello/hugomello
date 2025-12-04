import { ResponsiveChoropleth } from '@nivo/geo';
import worldCountries from '../utils/world_countries.json';

const MyChoropleth = ({ data, domain }) => {
  return (
    <ResponsiveChoropleth
      data={data}                        // your aggregated {id, value} array
      features={worldCountries.features} // GeoJSON features
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      domain={domain}                    // [min, max] values for color scale
      /*colors="nivo"*/
      colors={[
        '#B8E0D2',
        '#76C7B7',
        '#38A69D',
        '#2E8C7D',
        '#1F6B5A'
      ]}
      unknownColor="#666666"
      valueFormat=".2s"
      enableGraticule={false}
      projectionScale={68}
      graticuleLineColor="#dddddd"
      borderWidth={0.5}
      borderColor="#eee"
      projectionTranslation={[0.5, 0.6]}

      // Hover tooltip
      
      legends={[
        {
          anchor: 'bottom-left',
          direction: 'column',
          justify: true,
          translateX: 20,
          translateY: -30,
          itemsSpacing: 0,
          itemWidth: 94,
          itemHeight: 18,
          itemDirection: 'left-to-right',
          itemTextColor: '#eee',
          itemOpacity: 0.85,
          symbolSize: 18
        }
      ]}

      theme={{
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
      }}
    />
  );
};

export default MyChoropleth;
