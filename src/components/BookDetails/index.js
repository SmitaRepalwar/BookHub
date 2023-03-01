import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {presentApiStatus: apiStatus.initial}

  componentDidMount() {
    this.getBooksList()
  }

  getBooksList = async () => {
    this.setState({presentApiStatus: apiStatus.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/book-hub/books/${id}`,
      options,
    )
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.setState({
        presentApiStatus: apiStatus.success,
        booksList: data.book_details,
      })
    } else {
      this.setState({presentApiStatus: apiStatus.failure})
    }
  }

  onSuccess = () => {
    const {booksList} = this.state

    const updatedList = {
      aboutAuthor: booksList.about_author,
      aboutBook: booksList.about_book,
      coverPic: booksList.cover_pic,
      authorName: booksList.author_name,
      readStatus: booksList.read_status,
    }
    const {id, rating, title} = booksList

    const {
      aboutAuthor,
      aboutBook,
      coverPic,
      authorName,
      readStatus,
    } = updatedList

    return (
      <div className="book-details-con">
        <div className="bookdetals-item-con">
          <img className="book-details-image" src={coverPic} alt={title} />
          <div className="list-book-description-details">
            <h1 className="title-heading-details">{title}</h1>
            <p>{authorName}</p>
            <div className="rating-con-details margin-class-details">
              <p>Avg rating </p>
              <BsFillStarFill className="star-details" />
              <p> {rating}</p>
            </div>
            <p className="margin-class-details text-color-details">
              Staus: {readStatus}
            </p>
          </div>
        </div>
        <hr />
        <div className="book-details-text">
          <h1>About Author</h1>
          <p>{aboutAuthor}</p>
          <h1>About Book</h1>
          <p>{aboutBook}</p>
        </div>
      </div>
    )
  }

  onTryAgain = () => {
    this.getBooksList()
  }

  onFailure = () => (
    <div className="failure-con">
      <img
        className="failure-image"
        src="https://res.cloudinary.com/djbsa7llg/image/upload/v1676701111/Group_7522_wtgzdz.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" className="failure-btn" onClick={this.onTryAgain}>
        Try Again
      </button>
    </div>
  )

  onLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderingComponent = () => {
    const {presentApiStatus} = this.state
    switch (presentApiStatus) {
      case apiStatus.success:
        return this.onSuccess()
      case apiStatus.inProgress:
        return this.onLoading()
      case apiStatus.failure:
        return this.onFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div testid="bookDetails" className="bookshelf-bg-con-details">
        <Header />
        {this.renderingComponent()}
        <Footer />
      </div>
    )
  }
}

export default BookDetails
