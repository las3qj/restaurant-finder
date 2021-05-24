import {useState, useEffect} from "react";
import ListItem from './ListItem';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ReactMapGL, {Marker} from 'react-map-gl';

const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_api_key;
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_api_key;

function RestaurantDash(props){
    const [street, setStreet] = useState("119 Washington Avenue");
    const [city, setCity] = useState("Charlottesville");
    const [state, setState] = useState("VA");
    const [coord, setCoord] = useState({lat: 38.026, lon: -78.535});
    const [restaurants, setRestaurants] = useState([]);
    const [currTypeFilter, setCurrTypeFilter] = useState("Restaurants");
    const [currDistFilter, setCurrDistFilter] = useState("All");
    const [currSort, setCurrSort] = useState("None");
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 38.026,
        longitude: -78.535,
        zoom: 8
      });

    const nameDecSort = (fE, sE) => sE.name > fE.name?1:-1;
    const nameIncSort = (fE, sE) => sE.name > fE.name?-1:1;
    const noSort = (fE, sE) => -1;
    const priceDecSort = (fE, sE) => fE.price_level===undefined || sE.price_level > fE.price_level?1:-1;
    const priceIncSort = (fE, sE) => sE.price_level===undefined || sE.price_level > fE.price_level?-1:1;
    const ratingDecSort = (fE, sE) => fE.rating===undefined || sE.rating > fE.rating?1:-1;
    const ratingIncSort = (fE, sE) => sE.rating===undefined || sE.rating > fE.rating?-1:1;
    

    useEffect(() => {
        const getAPI = async (type, radius, sort) => {
            await getCoord().then(resp => {
                if(resp.results.length>0) {
                    setCoord({lat: resp.results[0].geometry.location.lat, lon: resp.results[0].geometry.location.lng});
                    setViewport({...viewport, 
                        latitude: resp.results[0].geometry.location.lat, longitude: resp.results[0].geometry.location.lng});
                }
                return(getRest(type, radius));}
            ).then(resp => setRestaurants(resp.results.sort(sort)));
        }
        const getCoord = async () => {
            const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
            url.searchParams.append("address", street+" "+city+" "+state);
            url.searchParams.append("key", GOOGLE_KEY);

            return fetch(url)
                .then((resp) => resp.json());
        }
        const getRest = async (type, radius) => {
            const location = coord.lat+","+coord.lon;
            const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
            url.searchParams.append("key", GOOGLE_KEY);
            url.searchParams.append("location", location);
            if(radius===0) {
                url.searchParams.append("rankby", "distance");
            }
            else {
                url.searchParams.append("radius", radius);
            }
            url.searchParams.append("type", type);
            url.searchParams.append("opennow", true);
            return fetch(url)
                .then(resp => resp.json());            

        }
        const searchAbleType = currTypeFilter==="Restaurants"?"restaurant":currTypeFilter==="Bars"?"bar":"cafe";
        const searchAbleRadius = currDistFilter==="All"?0:currDistFilter==="1 Mile"?1609:currDistFilter==="5 Miles"?8054:16090;
        const searchAbleSort = currSort==="Name-Inc"?nameIncSort:currSort==="Name-Dec"?nameDecSort:currSort==="Price-Inc"?
            priceIncSort:currSort==="Price-Dec"?priceDecSort:currSort==="Rating-Inc"?
            ratingIncSort:currSort==="Rating-Dec"?ratingDecSort:noSort;
        getAPI(searchAbleType, searchAbleRadius, searchAbleSort);
    }, [street, city, state, currTypeFilter, currDistFilter, currSort]);
    return(
        <Container>
            <Row style={{margin: 10}}>
                <Col>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="street address">Address</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Small" value={street} onChange={(e) => setStreet(e.target.value)} aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="city">City</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Small" value={city} onChange={(e) => setCity(e.target.value)} aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="state">State</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Small" value={state} onChange={(e) => setState(e.target.value)} aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row style={{margin: 10}}>
                        <Col>
                            <h5>Filter..</h5>
                        </Col>
                        <Col>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-type-filter">
                                    {currTypeFilter}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as="button" onClick={()=>setCurrTypeFilter("Bars")}>Bars</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={()=>setCurrTypeFilter("Restaurants")}>Restaurants</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={()=>setCurrTypeFilter("Cafes")}>Cafes</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-dist-filter">
                                    {currDistFilter}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as="button" onClick={()=>setCurrDistFilter("All")}>All</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={()=>setCurrDistFilter("1 Mile")}>1 Mile</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={()=>setCurrDistFilter("5 Miles")}>5 Miles</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={()=>setCurrDistFilter("10 Miles")}>10 Miles</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row style={{margin: 10}}>
                        <Col>
                            <h5>Sort by..</h5>
                        </Col>
                        <Col>
                            <Button onClick={()=>setCurrSort(currSort==="Name-Inc"?"Name-Dec":currSort==="Name-Dec"?"None":"Name-Inc")}
                                variant={currSort.substr(0,4)==="Name"?"secondary":"outline-secondary"}
                            >
                                Name {currSort==="Name-Inc"?"^":currSort==="Name-Dec"?"v":""}
                            </Button>
                        </Col>
                        <Col>
                            <Button onClick={()=>setCurrSort(currSort==="Price-Inc"?"Price-Dec":currSort==="Price-Dec"?"None":"Price-Inc")}
                                variant={currSort.substr(0,5)==="Price"?"secondary":"outline-secondary"}
                            >
                                Price {currSort==="Price-Inc"?"^":currSort==="Price-Dec"?"v":""}
                            </Button>
                        </Col>
                        <Col>
                            <Button onClick={()=>setCurrSort(currSort==="Rating-Inc"?"Rating-Dec":currSort==="Rating-Dec"?"None":"Rating-Inc")}
                                variant={currSort.substr(0,6)==="Rating"?"secondary":"outline-secondary"}
                            >
                                Rating {currSort==="Rating-Inc"?"^":currSort==="Rating-Dec"?"v":""}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {restaurants.map(restaurant => <ListItem restaurant={restaurant}></ListItem>)}
                        </Col>
                    </Row>
                </Col>
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