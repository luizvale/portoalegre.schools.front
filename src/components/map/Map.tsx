import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureMapOptions,
} from 'react-azure-maps';
import { AuthenticationType } from 'azure-maps-control';

const points = [
  [-122.18822, 47.63208],
  [-122.18204, 47.63196],
  [-122.17243, 47.62976],
  [-122.16419, 47.63023],
  [-122.15852, 47.62942],
  [-122.15183, 47.62988],
  [-122.14256, 47.63451],
  [-122.13483, 47.64041]
];

const option: IAzureMapOptions = {
  authOptions: {
    authType: AuthenticationType.subscriptionKey,
    subscriptionKey: process.env.REACT_APP_SUBSCRIPTION_KEY,
  },
  center: [-122.18822, 47.63208],
  zoom: 12,
  view: 'Auto',
};

const Map = (props: any) => {
  const { itinerary } = props
  return (
      <div style={wrapperStyles.map}>
      <AzureMapsProvider>
        <div style={wrapperStyles.map}>
          <AzureMap options={option}>
            <AzureMapDataSourceProvider
              id={'AzureMapDataSourceProvider'}
              options={{
                lineMetrics: true,
              }}
            >
              <AzureMapLayerProvider
                options={{
                  strokeWidth: 4
                }}
                type={'LineLayer'}
              />
              <AzureMapFeature
                type={'LineString'}
                coordinates={itinerary}
              />
            </AzureMapDataSourceProvider>
          </AzureMap>
        </div>
      </AzureMapsProvider>
    </div>
  );
};

export const wrapperStyles = {
  map: {
    height: '550px',
    width: '700px',
  }
};

export default Map;