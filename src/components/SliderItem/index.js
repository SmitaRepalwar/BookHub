import {Link} from 'react-router-dom'
import './index.css'

const SliderItem = props => {
  const {bookDetails} = props
  const {id, title} = bookDetails
  const authorName = bookDetails.author_name
  const coverPic = bookDetails.cover_pic

  return (
    <Link to={`/books/${id}`} className="link-el">
      <li testid="sliderItem" className="slide-item-con">
        <img className="slide-image" src={coverPic} alt={title} />
        <h1>{title}</h1>
        <p className="slide-text">{authorName}</p>
      </li>
    </Link>
  )
}

export default SliderItem
