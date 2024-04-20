import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './FilterTickets.css'

function FiterTickets() {
  return (
    <div>
      <Form.Select aria-label="Floating label select example" className='filter-drop'>
        <option >Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
    </div>
  );
}

export default FiterTickets;