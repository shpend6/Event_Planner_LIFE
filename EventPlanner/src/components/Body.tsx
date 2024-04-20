import Cards from './Cards.tsx' 
import './Body.css'
import Filter from './FilterTickets.tsx';
function Body(){
    return(
        <div className='card'>
            <Cards></Cards>
            <Filter></Filter>
        </div>
    );
}
export default Body