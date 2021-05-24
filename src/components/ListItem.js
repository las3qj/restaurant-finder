import ListGroup from 'react-bootstrap/ListGroup';

function ListItem(props) {
    //const variant = props.restaurant.types.includes("restaurant") ? "primary" : props.retaurant.types.includes("bar") ? "info" : "warning";
    return(
        <ListGroup.Item variant="light">
            {props.restaurant.name}
        </ListGroup.Item>
    );
}

export default ListItem;