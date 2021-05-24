import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function ListItem(props) {
    const rating = props.restaurant.rating || "?";
    const dirRef = "https://www.google.com/maps/search/?api=1&query="+
        props.restaurant.geometry.location.lat+","+props.restaurant.geometry.location.lng;

    let pricing = "";
    console.log(props.restaurant.price_level);
    if(props.restaurant.price_level===undefined) {
        pricing = "?";
    }
    for(let i = 0; i < props.restaurant.price_level; i++) {
        pricing = pricing+"$";
    }

    return(
        <Card bg="light">
            <Card.Body>
                <Card.Title>{props.restaurant.name}</Card.Title>
                <Card.Text>
                    {rating} / 5.0 <br/>
                    {pricing}
                </Card.Text>
                <Button variant="primary" href={dirRef}>Get Directions</Button>
            </Card.Body>
        </Card>

    );
}

export default ListItem;