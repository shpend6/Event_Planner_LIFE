import Cardss from './Cards.tsx' 
import './Body.css'
import FilterTickets from './FilterTickets.tsx';
function Body(){
    return(
        <div className='card'>
            <Cardss></Cardss>
            <FilterTickets></FilterTickets>
        </div>
    );
}
export default Body