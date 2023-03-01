import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div testid="notFound" className="not-found-con">
    <img
      className="not-found-image"
      src="https://res.cloudinary.com/djbsa7llg/image/upload/v1676701080/Group_7484_oppbge.png"
      alt="Page Not Found"
    />
    <h1>Page Not Found</h1>
    <p>
      we are sorry, the page you requested could not be found please Go back to
      home page
    </p>
    <Link to="/" className="link-el">
      <button type="button" className="not-found-btn">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
