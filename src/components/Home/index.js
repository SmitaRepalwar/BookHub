import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import SliderItem from '../SliderItem'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {booksList: [], presentApiStatus: apiStatus.initial}

  componentDidMount() {
    this.getBooksList()
  }

  getBooksList = async () => {
    this.setState({presentApiStatus: apiStatus.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(
      'https://apis.ccbp.in/book-hub/top-rated-books',
      options,
    )
    console.log(response)
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

  onSuccess = () => {
    const {booksList} = this.state

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <ul className="slider-con">
        <Slider {...settings}>
          {booksList.map(eachItem => (
            <SliderItem bookDetails={eachItem} key={eachItem.id} />
          ))}
        </Slider>
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

  onFindBooksClicked = () => {
    const {history} = this.props
    history.replace('/shelf')
  }

  findBooksButton = () => (
    <button
      type="button"
      className="find-books-btn"
      onClick={this.onFindBooksClicked}
    >
      Find Books
    </button>
  )

  render() {
    return (
      <div testid="home" className="home-bg-con">
        <Header />
        <div className="home-bottom-con">
          <div className="text-home">
            <h1>Find Your Next Favorite Books?</h1>
            <p>
              You are in the right place. tell us what titles or genres you have
              enjoyed in the past and we will give you surprisingly insightfull
              recommendations.
            </p>
            <div className="sm-home-btn">{this.findBooksButton()}</div>
          </div>
          <div className="corousal-card">
            <div className="card-button-con">
              <h1 className="carousal-heading">Top Rated Books</h1>
              <div className="lg-home-btn">{this.findBooksButton()}</div>
            </div>
            {this.renderingComponent()}
          </div>

          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
