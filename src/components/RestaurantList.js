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

    const sortFunct = (fE, sE, propName, dec) => fE[propName]===undefined || sE[propName] > fE[propName]?dec*1:dec*-1;

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
                {["Name","Pricing","Rating"].map((propName) => {
                    return(
                        <Col>
                            <SortingButton propName={propName} currSort={currSort} setCurrSort={setCurrSort}/>
                        </Col>
                    )
                })}
            </Row>
            <Row>
                <Col>
                    {restaurants.sort((fE, sE) => {
                        if(currSort==="None")
                            return(-1);
                        
                        const propName = currSort.substr(0,2)==="Na"?"name":currSort.substr(0,2)==="Pr"?"price_level":"rating";
                        const mult = currSort.substr(3,1)==="D"?1:-1;
                        return(sortFunct(fE, sE, propName, mult));
                    }).map(restaurant => <ListItem restaurant={restaurant}></ListItem>)}
                </Col>
            </Row>
        </Col>
    );
}

function SortingButton({propName, currSort, setCurrSort}) {
    return(
        <Button onClick={()=>setCurrSort(currSort.substr(0,2)!==propName.substr(0,2)?propName.substr(0,2)+"-I":
            currSort.substr(3,1)==="I"?propName.substr(0,2)+"-D":"None")}
            variant={currSort.substr(0,2)===propName.substr(0,2)?"secondary":"outline-secondary"}>
            {propName} {currSort===propName.substr(0,2)+"-I"?"^":currSort===propName.substr(0,2)+"-D"?"v":""}
        </Button>
    )
}

export default RestaurantList;