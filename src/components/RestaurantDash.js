import {useState, useEffect} from "react";
import Map from './Map';
import ListItem from './ListItem';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_api_key;

function RestaurantDash(props){
    const [search, setSearch] = useState("119 Washington Avenue");
    const [coord, setCoord] = useState({lat: 38.026, lon: -78.535});
    const [restaurants, setRestaurants] = useState([]);
    const [currTypeFilter, setCurrTypeFilter] = useState("Restaurants");
    const [currDistFilter, setCurrDistFilter] = useState("All");
    const [currSort, setCurrSort] = useState("None");
    const nameDecSort = (fE, sE) => sE.name > fE.name?1:-1;
    const nameIncSort = (fE, sE) => sE.name > fE.name?-1:1;
    const noSort = (fE, sE) => -1;
    

    useEffect(() => {
        const getAPI = async (type, radius) => {
            await getCoord().then(resp => {
                if(resp.results.length>0) {
                    setCoord({lat: resp.results[0].geometry.location.lat, lon: resp.results[0].geometry.location.lng});
                }
                return(getRest(type, radius));}
            ).then(resp => setRestaurants(resp.results.sort(currSort==="Name-Inc"?nameIncSort:currSort==="Name-Dec"?nameDecSort:noSort)));
        }
        const getCoord = async () => {
            const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
            url.searchParams.append("address", search+" Charlottesville VA");
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
        getAPI(searchAbleType, searchAbleRadius);
    }, [search, currTypeFilter, currDistFilter, currSort]);
    return(
        <div>
            <Container>
                <Row>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-sm">Cville Address</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Small" value={search} onChange={(e) => setSearch(e.target.value)} aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
                </Row>
                <Row>
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
                    <Col>
                        <Button onClick={()=>setCurrSort(currSort==="Name-Inc"?"Name-Dec":currSort==="Name-Dec"?"None":"Name-Inc")}
                            variant={currSort.substr(0,4)==="Name"?"secondary":"outline-secondary"}
                        >
                            Name {currSort==="Name-Inc"?"^":currSort==="Name-Dec"?"v":""}
                        </Button>
                    </Col>
                </Row>
            </Container>
            <ListGroup>
                {restaurants.map(restaurant => <ListItem restaurant={restaurant}></ListItem>)}
            </ListGroup>
            <Map coord={coord} restaurants={restaurants}></Map>
        </div>
    );
}

export default RestaurantDash;