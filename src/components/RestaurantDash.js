import {useState, useEffect} from "react";
import RestaurantList from './RestaurantList';
import SearchBar from './SearchBar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ReactMapGL, {Marker} from 'react-map-gl';

const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_api_key;
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_api_key;

function RestaurantDash(){
    const [address, setAddress] = useState("119 Washington Avenue Charlottesville VA");
    const [coord, setCoord] = useState({lat: 38.026, lon: -78.535});
    const [restaurants, setRestaurants] = useState([]);
    const [currType, setCurrType] = useState("restaurant");
    const [currRadius, setCurrRadius] = useState(0);
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 38.026,
        longitude: -78.535,
        zoom: 12
      });

    useEffect(() => {
        const getAPI = async () => {
            await getCoord().then(resp => {
                if(resp.results.length>0) {
                    setCoord({lat: resp.results[0].geometry.location.lat, lon: resp.results[0].geometry.location.lng});
                    setViewport({...viewport, 
                        latitude: resp.results[0].geometry.location.lat, longitude: resp.results[0].geometry.location.lng});
                }
                return(getRest());}
            ).then(resp => setRestaurants(resp.results));
        }
        const getCoord = async () => {
            const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
            url.searchParams.append("address", address);
            url.searchParams.append("key", GOOGLE_KEY);

            return fetch(url)
                .then((resp) => resp.json());
        }
        const getRest = async () => {
            const location = coord.lat+","+coord.lon;
            const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
            url.searchParams.append("key", GOOGLE_KEY);
            url.searchParams.append("location", location);
            if(currRadius===0) {
                url.searchParams.append("rankby", "distance");
            }
            else {
                url.searchParams.append("radius", currRadius);
            }
            url.searchParams.append("type", currType);
            url.searchParams.append("opennow", true);
            return fetch(url)
                .then(resp => resp.json());            

        }
        getAPI();
    }, [address, currType, currRadius]);

    return(
        <Container>
            <SearchBar updateAddress={setAddress}></SearchBar>
            <Row>
                <RestaurantList restaurants={restaurants} setType={setCurrType} setRadius={setCurrRadius}/>
                <Col>
                    <ReactMapGL
                        {...viewport}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                        onViewportChange={nextViewport => setViewport(nextViewport)}
                    >
                        {restaurants.map(restaurant => {
                            return(
                            <Marker latitude={restaurant.geometry.location.lat} longitude={restaurant.geometry.location.lng} 
                                offsetLeft={-20} offsetTop={-10} 
                                captureClick={false}>
                                <img src="pin.png" width={10} height={10}/>
                                <div>{restaurant.name}</div>
                            </Marker>);
                        })}
                    </ReactMapGL>
                </Col>
            </Row>
        </Container>
    );
}

export default RestaurantDash;