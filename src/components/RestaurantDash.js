import {useState, useEffect} from "react";
import Map from './Map';
import ListItem from './ListItem';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const WEATHER_KEY = process.env.REACT_APP_WEATHER_api_key;
const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_api_key;

function RestaurantDash(props){
    const [search, setSearch] = useState(22903);
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
                setCoord({lat: resp.coord.lat, lon: resp.coord.lon});
                return(getRest(resp.coord, type, radius));}
            ).then(resp => setRestaurants(resp.results.sort(currSort==="Name-Inc"?nameIncSort:currSort==="Name-Dec"?nameDecSort:noSort)));
        }
        const getCoord = async () => {
            const url = new URL("https://api.openweathermap.org/data/2.5/weather");
            url.searchParams.append("zip", search);

            url.searchParams.append("appid", WEATHER_KEY);
            url.searchParams.append("units", "imperial");
            return fetch(url)
                .then((resp) => resp.json());
        }
        const getRest = async (coord, type, radius) => {
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
            
            return ({
                "html_attributions" : [],
                "results" : [
                   {
                      "geometry" : {
                         "location" : {
                            "lat" : -33.870775,
                            "lng" : 151.199025
                         }
                      },
                      "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/travel_agent-71.png",
                      "name" : "Rhythmboat Cruises",
                      "opening_hours" : {
                         "open_now" : true
                      },
                      "photos" : [
                         {
                            "height" : 270,
                            "html_attributions" : [],
                            "photo_reference" : "CnRnAAAAF-LjFR1ZV93eawe1cU_3QNMCNmaGkowY7CnOf-kcNmPhNnPEG9W979jOuJJ1sGr75rhD5hqKzjD8vbMbSsRnq_Ni3ZIGfY6hKWmsOf3qHKJInkm4h55lzvLAXJVc-Rr4kI9O1tmIblblUpg2oqoq8RIQRMQJhFsTr5s9haxQ07EQHxoUO0ICubVFGYfJiMUPor1GnIWb5i8",
                            "width" : 519
                         }
                      ],
                      "place_id" : "ChIJyWEHuEmuEmsRm9hTkapTCrk",
                      "reference" : "ChIJyWEHuEmuEmsRm9hTkapTCrk",
                      "types" : [ "travel_agency", "restaurant", "food", "establishment" ],
                      "vicinity" : "Pyrmont Bay Wharf Darling Dr, Sydney"
                   },
                   {
                      "geometry" : {
                         "location" : {
                            "lat" : -33.866891,
                            "lng" : 151.200814
                         }
                      },
                      "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                      "name" : "Private Charter Sydney Habour Cruise",
                      "photos" : [
                         {
                            "height" : 426,
                            "html_attributions" : [],
                            "photo_reference" : "CnRnAAAAL3n0Zu3U6fseyPl8URGKD49aGB2Wka7CKDZfamoGX2ZTLMBYgTUshjr-MXc0_O2BbvlUAZWtQTBHUVZ-5Sxb1-P-VX2Fx0sZF87q-9vUt19VDwQQmAX_mjQe7UWmU5lJGCOXSgxp2fu1b5VR_PF31RIQTKZLfqm8TA1eynnN4M1XShoU8adzJCcOWK0er14h8SqOIDZctvU",
                            "width" : 640
                         }
                      ],
                      "place_id" : "ChIJqwS6fjiuEmsRJAMiOY9MSms",
                      "reference" : "ChIJqwS6fjiuEmsRJAMiOY9MSms",
                      "types" : [ "restaurant", "food", "establishment" ],
                      "vicinity" : "Australia"
                   },
                   {
                      "geometry" : {
                         "location" : {
                            "lat" : -33.870943,
                            "lng" : 151.190311
                         }
                      },
                      "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                      "name" : "Bucks Party Cruise",
                      "opening_hours" : {
                         "open_now" : true
                      },
                      "photos" : [
                         {
                            "height" : 600,
                            "html_attributions" : [],
                            "photo_reference" : "CnRnAAAA48AX5MsHIMiuipON_Lgh97hPiYDFkxx_vnaZQMOcvcQwYN92o33t5RwjRpOue5R47AjfMltntoz71hto40zqo7vFyxhDuuqhAChKGRQ5mdO5jv5CKWlzi182PICiOb37PiBtiFt7lSLe1SedoyrD-xIQD8xqSOaejWejYHCN4Ye2XBoUT3q2IXJQpMkmffJiBNftv8QSwF4",
                            "width" : 800
                         }
                      ],
                      "place_id" : "ChIJLfySpTOuEmsRsc_JfJtljdc",
                      "reference" : "ChIJLfySpTOuEmsRsc_JfJtljdc",
                      "types" : [ "restaurant", "food", "establishment" ],
                      "vicinity" : "37 Bank St, Pyrmont"
                   },
                   {
                      "geometry" : {
                         "location" : {
                            "lat" : -33.867591,
                            "lng" : 151.201196
                         }
                      },
                      "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/travel_agent-71.png",
                      "name" : "Australian Cruise Group",
                      "opening_hours" : {
                         "open_now" : true
                      },
                      "photos" : [
                         {
                            "height" : 242,
                            "html_attributions" : [],
                            "photo_reference" : "CnRnAAAABjeoPQ7NUU3pDitV4Vs0BgP1FLhf_iCgStUZUr4ZuNqQnc5k43jbvjKC2hTGM8SrmdJYyOyxRO3D2yutoJwVC4Vp_dzckkjG35L6LfMm5sjrOr6uyOtr2PNCp1xQylx6vhdcpW8yZjBZCvVsjNajLBIQ-z4ttAMIc8EjEZV7LsoFgRoU6OrqxvKCnkJGb9F16W57iIV4LuM",
                            "width" : 200
                         }
                      ],
                      "place_id" : "ChIJrTLr-GyuEmsRBfy61i59si0",
                      "reference" : "ChIJrTLr-GyuEmsRBfy61i59si0",
                      "types" : [ "travel_agency", "restaurant", "food", "establishment" ],
                      "vicinity" : "32 The Promenade, King Street Wharf 5, Sydney"
                   }
                ],
                "status" : "OK"
             });
        }
        const searchAbleType = currTypeFilter==="Restaurants"?"restaurant":currTypeFilter==="Bars"?"bar":"cafe";
        const searchAbleRadius = currDistFilter==="All"?0:currDistFilter==="1 Mile"?1609:currDistFilter==="5 Miles"?8054:16090;
        getAPI(searchAbleType, searchAbleRadius);
    }, [search, currTypeFilter, currDistFilter, currSort]);
    return(
        <div>
            <Container>
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