import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import './AboutC.css'
function AboutC(){
    return(
    <div className='about-img'>
      <Card className="bg-dark text-white m-0">
      <Card.Img className='Img' src="https://static.vecteezy.com/system/resources/previews/002/937/791/original/dark-purple-pink-abstract-blur-background-vector.jpg" alt="Card image" />
      <Card.ImgOverlay >
        <h1>About us</h1> 
        <h6>YOUR TRUSTED EVENT MANAGEMENT PARTNER</h6> <br/> <br/>  
        <div className='about-card'>
        <Card.Text>
          <p> <h4>What we do</h4> <br/> In the realm of event planning, we've built a platform that's all about connecting 
            people with the events they love. Our Events Web is a user-friendly hub where you can easily
         discover and engage with a diverse range of events. From music concerts to food festivals, 
         sports tournaments to art exhibitions, we've got you covered. <br/>
         <br/>We focus on quality, ensuring that every event featured on our platform offers an exceptional experience. 
         With customizable search options, you can find events based on your interests, location, and schedule. 
         Plus, our social features allow you to connect with others, share experiences, and coordinate plans 
         effortlessly. <br/>
         <br/>At the core of our platform are three key elements: timeliness, location, and category. 
         These pillars guide users to find events that fit perfectly into their lives. So whether you're 
         planning a weekend adventure or seeking inspiration for your next outing, our Events Web is your 
         go-to destination for unforgettable experiences. Join us and make every event a moment to cherish.</p>
        </Card.Text>
        </div>
        <div className="who">
          <div>
            <h4>Event's Team</h4>
          </div>
          <div className="cards-profile">
          <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG87uYqqR05lCO4L4-5pVO-Wiw54Qn4OOJ72BmFFy0fQ&s" />
      <Card.Body>
        <Card.Title>Besarta Kuci</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://st.depositphotos.com/1779253/5140/v/450/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg" />
      <Card.Body>
        <Card.Title>Donat Kusari</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG87uYqqR05lCO4L4-5pVO-Wiw54Qn4OOJ72BmFFy0fQ&s" />
          <Card.Body>
           <Card.Title>Vanesa Mulliqi</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
           </Card.Text>
          </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://st.depositphotos.com/1779253/5140/v/450/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg" />
      <Card.Body>
        <Card.Title>Shpend Ismaili</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
          </Card>
          </div>
        </div>
      </Card.ImgOverlay>
    </Card>
    </div>
    );
}
export default AboutC



