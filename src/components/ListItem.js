import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function ListItem({restaurant}) {
    const rating = restaurant.rating || "?";
    const dirRef = "https://www.google.com/maps/search/?api=1&query="+
        restaurant.geometry.location.lat+","+restaurant.geometry.location.lng;

    let pricing = "";
    if(restaurant.price_level===undefined) {
        pricing = "?";
    }
    for(let i = 0; i < restaurant.price_level; i++) {
        pricing = pricing+"$";
    }

    return(
        <Card bg="light">
            <Card.Body>
                <Card.Title>{restaurant.name}</Card.Title>
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