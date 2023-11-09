
import './Event.css';
function Event (props) {

    function handleClick(props) {
        alert(`Clicked on event: ${props.name}`);
      }



    return (
        <div onClick={handleClick}  className="event" >
            <h1>{props.name}</h1>
            <p>Start date: {props.start_date}</p>
            <p>Capacity: {props.capacity}</p>
            <p>Description: {props.description}</p>
            <p> Location id(TODO):{props.location_id}</p>

        </div>
    )


}

export default Event;