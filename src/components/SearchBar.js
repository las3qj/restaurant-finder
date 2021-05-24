import {useState, useEffect} from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

function SearchBar({updateAddress}) {
    const [street, setStreet] = useState("119 Washington Avenue");
    const [city, setCity] = useState("Charlottesville");
    const [state, setState] = useState("VA");

    useEffect(() => {
        updateAddress(street+" "+city+" "+state);
    }, [street, city, state, updateAddress]);

    return(
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
                    <FormControl aria-label="Small" value={state} onChange={(e) => {
                        if(e.target.value.length<=2){
                            setState(e.target.value);
                        }
                    }} aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
            </Col>
        </Row>
    );
}

export default SearchBar;