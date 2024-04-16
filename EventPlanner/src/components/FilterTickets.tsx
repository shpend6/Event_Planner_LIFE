import Dropdown from 'react-bootstrap/Dropdown';
import './FilterTickets.css'

function FilterTickets(){
    return(
        <div className='filter_tickets'>
            <h2>Explore events in</h2>
            <hr /> 
            <div className="block">
            <div className='dropdown'>
                <div className="time">
                <Dropdown>
                 <Dropdown.Toggle variant="light" id="dropdown-basic">
                       Time 
                 </Dropdown.Toggle>

                     <Dropdown.Menu>
                     <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                     <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                     <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                     </Dropdown.Menu>
                     </Dropdown>
                </div>
                <div className="time">
                <Dropdown>
                 <Dropdown.Toggle variant="light" id="dropdown-basic">
                       Location
                 </Dropdown.Toggle>

                     <Dropdown.Menu>
                     <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                     <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                     <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                     </Dropdown.Menu>
                     </Dropdown>
                </div>
            </div>
            </div>
        </div>
    );
}

export default FilterTickets