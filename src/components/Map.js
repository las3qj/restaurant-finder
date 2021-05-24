import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_api_key;

function Map(props) {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: props.coord.lat,
    longitude: props.coord.lon,
    zoom: 8
  });
  

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
        {props.restaurants.map(restaurant => {
            return(
            <Marker latitude={restaurant.geometry.location.lat} longitude={restaurant.geometry.location.lng} 
                offsetLeft={-20} offsetTop={-10} 
                captureClick={false}>
                <img src="pin.png" width={10} height={10}/>
                <div>{restaurant.name}</div>
            </Marker>);
        })}

    </ReactMapGL>


  );
}

export default Map;