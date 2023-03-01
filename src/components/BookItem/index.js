import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookItem = props => {
  const {book} = props
  const bookData = {
    authorName: book.author_name,
    coverPic: book.cover_pic,
    readStatus: book.read_status,
  }
  const {id, rating, title} = book
  const {authorName, coverPic, readStatus} = bookData

  return (
    <Link to={`/books/${id}`} className="link-el">
      <li className="book-list-item-con">
        <img className="book-image" src={coverPic} alt={title} />
        <div className="list-book-description">
          <h1 className="title-heading">{title}</h1>
          <p>{authorName}</p>
          <div className="rating-con margin-class">
            <p>Avg rating </p>
            <BsFillStarFill className="star" />
            <p> {rating}</p>
          </div>
          <p className="margin-class text-color">Status: {readStatus}</p>
        </div>
      </li>
    </Link>
  )
}

export default BookItem
