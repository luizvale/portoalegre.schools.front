import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureMapOptions,
} from 'react-azure-maps';
import { AuthenticationType } from 'azure-maps-control';

const option: IAzureMapOptions = {
  authOptions: {
    authType: AuthenticationType.subscriptionKey,
    subscriptionKey: process.env.REACT_APP_SUBSCRIPTION_KEY,
  },
  center: [-30.099495, -51.229278],
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
                  strokeWidth: 5
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