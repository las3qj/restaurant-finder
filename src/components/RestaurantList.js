import {useState, useEffect} from "react";
import ListItem from './ListItem';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function RestaurantList({restaurants, setType, setRadius}) {
    const [currTypeFilter, setCurrTypeFilter] = useState("Restaurants");
    const [currDistFilter, setCurrDistFilter] = useState("All");
    const [currSort, setCurrSort] = useState("None");
    /*
    const searchAbleSort = currSort==="Name-Inc"?nameIncSort:currSort==="Name-Dec"?nameDecSort:currSort==="Price-Inc"?
    priceIncSort:currSort==="Price-Dec"?priceDecSort:currSort==="Rating-Inc"?
    ratingIncSort:currSort==="Rating-Dec"?ratingDecSort:noSort;

    
    const nameDecSort = (fE, sE) => sE.name > fE.name?1:-1;
    const nameIncSort = (fE, sE) => sE.name > fE.name?-1:1;
    const noSort = (fE, sE) => -1;
    const priceDecSort = (fE, sE) => fE.price_level===undefined || sE.price_level > fE.price_level?1:-1;
    const priceIncSort = (fE, sE) => sE.price_level===undefined || sE.price_level > fE.price_level?-1:1;
    const ratingDecSort = (fE, sE) => fE.rating===undefined || sE.rating > fE.rating?1:-1;
    const ratingIncSort = (fE, sE) => sE.rating===undefined || sE.rating > fE.rating?-1:1;
    */

    useEffect(() => {
        switch(currTypeFilter) {
            case 'Bars':
                setType("bar");
                break;
            case 'Restaurants':
                setType("restaurant");
                break;
            default:
                setType("cafe");
                break;
        }
    },[currTypeFilter, setType]);

    useEffect(() => {
        switch(currDistFilter) {
            case 'All':
                setRadius(0);
                break;
            case '1 Mile':
                setRadius(1609);
                break;
            case '5 Miles':
                setRadius(8054);
                break;
            default:
                setRadius(16090);
                break;
        }
    },[currDistFilter, setRadius]);

    return(
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
    );
}

export default RestaurantList;