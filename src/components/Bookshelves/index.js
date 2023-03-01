import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import BookItem from '../BookItem'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Bookshelves extends Component {
  state = {
    booksList: [],
    presentApiStatus: apiStatus.initial,
    searchInput: '',
    activeShelf: bookshelvesList[0].value,
  }

  componentDidMount() {
    this.getBooksList()
  }

  getBooksList = async () => {
    this.setState({presentApiStatus: apiStatus.inProgress})

    const {activeShelf, searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/book-hub/books?shelf=${activeShelf}&search=${searchInput}`,
      options,
    )
    const data = await response.json()

    if (response.ok === true) {
      this.setState({
        presentApiStatus: apiStatus.success,
        booksList: data.books,
      })
    } else {
      this.setState({presentApiStatus: apiStatus.failure})
    }
  }

  onClickButton = () => {
    this.getBooksList()
  }

  onShelfClick = event => {
    console.log(event.target.value)
    this.setState({activeShelf: event.target.value}, this.getBooksList)
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onSuccess = () => {
    const {booksList, searchInput} = this.state
    if (booksList.length === 0) {
      return (
        <div className="bookshelf-bg-con">
          <img
            className="failure-image"
            src="https://res.cloudinary.com/djbsa7llg/image/upload/v1676701095/Asset_1_1_bm4hle.png"
            alt="no books"
          />
          <p>Your search for {searchInput} did not find any matches.</p>
        </div>
      )
    }

    return (
      <ul className="book-bg-list-con">
        {booksList.map(eachBook => (
          <BookItem book={eachBook} key={eachBook.id} />
        ))}
      </ul>
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
    const {activeShelf, searchInput} = this.state
    const activeLabelItem = bookshelvesList.find(
      eachBook => eachBook.value === activeShelf,
    )
    const activeLabel = activeLabelItem.label
    const activeShelfItem = 'active-shelf-item'
    const shelfItem = 'shelf-item'
    return (
      <div testid="bookShelves" className="bookshelf-bg-con">
        <Header />
        <div className="bookshelf-con">
          <div className="search-input-con">
            <input
              type="search"
              className="search-input"
              value={searchInput}
              onChange={this.onSearch}
            />
            <button
              type="button"
              onClick={this.onClickButton}
              testid="searchButton"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="book-shelf-con">
            <h1 className="shelf-heading">Bookshelves</h1>
            <ul className="shelf-list-con">
              {bookshelvesList.map(eachShell => (
                <li key={eachShell.id}>
                  <button
                    type="button"
                    value={eachShell.value}
                    onClick={this.onShelfClick}
                    className={`${
                      activeShelf === eachShell.value
                        ? activeShelfItem
                        : shelfItem
                    }`}
                  >
                    {eachShell.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="books-con">
            <h1 className="book-text-bg">{activeLabel} Books</h1>
            <div className="books-main-con">{this.renderingComponent()}</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Bookshelves
